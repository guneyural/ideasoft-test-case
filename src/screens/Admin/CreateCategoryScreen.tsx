import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import AdminScreenNavbar from "../../components/Admin/AdminScreenNavbar";
import { useState } from "react";
import { Category } from "../../store/slices/Product/types";
import CustomSelect from "../../components/SearchScreen/CustomSelect";
import Toast from "react-native-toast-message";
import {
  createCategory,
  updateCategory,
} from "../../store/slices/Admin/AdminSlice";

type CreateCategoryScreenProps = NativeStackScreenProps<
  ApplicationStackParamList,
  "CreateCategoryScreen"
>;

const showcaseDisplayTypes = [
  { label: "Kategori İçeriği", value: 1 },
  { label: "Kategori ve Üst Kategori İçeriği", value: 2 },
  { label: "Tüm Üst Kategoriler", value: 3 },
];
const displayShowcaseFooterContentOptions = [
  { label: "Masaüstü", value: 1 },
  { label: "Mobil ve Masaüstü", value: 2 },
];

function CreateCategoryScreen({
  navigation,
  route,
}: CreateCategoryScreenProps) {
  const dispatch = useAppDispatch();
  const Admin = useAppSelector((state) => state.Admin);

  const [category, setCategory] = useState<Category>(
    route.params.isUpdating
      ? (route.params.category as Category)
      : {
          name: "",
          displayShowcaseContent: 0,
          showcaseContent: "",
          showcaseContentDisplayType: 1,
          displayShowcaseFooterContent: 0,
          showcaseFooterContent: "",
          showcaseFooterContentDisplayType: 1,
          metaDescription: "",
          metaKeywords: "",
          status: 1,
        }
  );

  const autoGenerateFields = () => {
    const highestId =
      Admin.categories.length > 0
        ? Math.max(...Admin.categories.map((p) => p.id))
        : 0;

    const slug = category.name
      ? category.name.toLowerCase().replace(/\s+/g, "-")
      : "category-slug";

    return route.params.isUpdating
      ? {
          slug,
          pageTitle: category.name,
          canonicalUrl: `urun/${slug}`,
        }
      : {
          slug,
          categoryShowcaseStatus: 1,
          sortOrder: highestId + 1,
          pageTitle: category.name,
          canonicalUrl: `kategoriler/${slug}`,
          hasChildren: 0,
          isCombine: 0,
          seoSetting: null,
          parent: null,
        };
  };

  const handleSubmit = () => {
    if (
      category.displayShowcaseFooterContent >= 1 &&
      !category.showcaseFooterContent.trim()
    )
      return Toast.show({
        type: "error",
        text1: "Gösterim alt içeriği boş olamaz.",
      });

    if (
      category.displayShowcaseContent >= 1 &&
      !category.showcaseContent.trim()
    )
      return Toast.show({
        type: "error",
        text1: "Lütfen üst gösterim içerik metnini girin.",
      });

    const requiredFields = ["metaDescription", "metaKeywords", "name"];

    for (let field of requiredFields) {
      if (!category[field].trim())
        return Toast.show({
          type: "error",
          text1: "Lütfen tüm alanları doldurun",
        });
    }

    const autoFields = autoGenerateFields();
    const newCategory = { ...category, ...autoFields };

    if (route.params.isUpdating) {
      dispatch(updateCategory(newCategory)).then((res) => {
        if (res.type == "updateCategory/fulfilled") navigation.goBack();
      });
    } else {
      dispatch(createCategory(newCategory)).then((res) => {
        if (res.type == "createCategory/fulfilled") navigation.goBack();
      });
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <AdminScreenNavbar
        screenTitle={
          route.params.isUpdating ? "Kategori Güncelle" : "Kategori Oluştur"
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} className="bg-white p-4">
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Kategori Adı</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Kategori adını girin"
            value={category.name}
            onChangeText={(text) => setCategory({ ...category, name: text })}
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">
            Kategori açıklaması
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 h-24"
            placeholder="Kategori açıklamasını girin"
            value={category.metaDescription}
            onChangeText={(text) =>
              setCategory({ ...category, metaDescription: text })
            }
            multiline
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">
            Anahtar kelimeler (Virgül ile ayırın)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Anahtar kelimeleri virgül ile ayırark girin"
            value={category.metaKeywords}
            onChangeText={(text) =>
              setCategory({ ...category, metaKeywords: text })
            }
          />
        </View>

        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-gray-700 font-semibold">
            Üst Gösterim İçeriğini Göster
          </Text>
          <Switch
            value={category.displayShowcaseContent == 1}
            onValueChange={(value) =>
              setCategory({
                ...category,
                displayShowcaseContent: value ? 1 : 0,
              })
            }
          />
        </View>

        {category.displayShowcaseContent == 1 ? (
          <View>
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Üst İçerik Metni
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 min-h-16"
                placeholder="Üst içerik metnini girin"
                value={category.showcaseContent}
                onChangeText={(text) =>
                  setCategory({ ...category, showcaseContent: text })
                }
                multiline
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Üst İçerik Gösterim Türü
              </Text>
              <CustomSelect
                selectedValue={showcaseDisplayTypes.find(
                  (item) => item.value == category.showcaseContentDisplayType
                )}
                title="Üst İçerik Gösterim Türü"
                options={showcaseDisplayTypes}
                onSelect={({ value }) =>
                  setCategory({
                    ...category,
                    showcaseContentDisplayType: Number(value),
                  })
                }
              />
            </View>
          </View>
        ) : null}

        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-gray-700 font-semibold">
            Footer Gösterim İçeriğini Göster
          </Text>
          <Switch
            value={category.displayShowcaseFooterContent >= 1}
            onValueChange={(value) =>
              setCategory({
                ...category,
                displayShowcaseFooterContent: value ? 1 : 0,
              })
            }
          />
        </View>

        {category.displayShowcaseFooterContent >= 1 ? (
          <View>
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Footer İçeriği Gösterilecek Platformlar
              </Text>
              <CustomSelect
                selectedValue={displayShowcaseFooterContentOptions.find(
                  (item) => item.value == category.displayShowcaseFooterContent
                )}
                title="Footer İçeriği Gösterilecek Platformlar"
                options={displayShowcaseFooterContentOptions}
                onSelect={({ value }) =>
                  setCategory({
                    ...category,
                    displayShowcaseFooterContent: Number(value),
                  })
                }
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Footer İçerik Metni
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 min-h-16"
                placeholder="Üst içerik metnini girin"
                value={category.showcaseFooterContent}
                onChangeText={(text) =>
                  setCategory({ ...category, showcaseFooterContent: text })
                }
                multiline
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Footer İçerik Gösterim Türü
              </Text>
              <CustomSelect
                selectedValue={showcaseDisplayTypes.find(
                  (item) =>
                    item.value == category.showcaseFooterContentDisplayType
                )}
                title="Footer İçerik Gösterim Türü"
                options={showcaseDisplayTypes}
                onSelect={({ value }) =>
                  setCategory({
                    ...category,
                    showcaseFooterContentDisplayType: Number(value),
                  })
                }
              />
            </View>
          </View>
        ) : null}

        <View className="flex-row items-center mb-4 justify-between">
          <Text className="text-gray-700 font-semibold mr-2">
            Kategori Durumu: {category.status == 1 ? "Aktif" : "Pasif"}
          </Text>
          <Switch
            value={category.status == 1}
            onValueChange={(value) =>
              setCategory({
                ...category,
                status: value ? 1 : 0,
              })
            }
          />
        </View>

        <View className="mt-4">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-black py-3 mb-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">
              {route.params.isUpdating
                ? "Kategori Güncelle"
                : "Kategori Oluştur"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateCategoryScreen;
