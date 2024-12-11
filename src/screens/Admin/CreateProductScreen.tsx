import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import AdminScreenNavbar from "../../components/Admin/AdminScreenNavbar";
import { useState } from "react";
import { useAppSelector } from "../../helpers/reduxHooks";
import { TouchableOpacity } from "react-native";
import CustomSelect from "../../components/SearchScreen/CustomSelect";
import {
  currencyLabelTranslator,
  stockTypeLabelTranslator,
} from "../../helpers/text";
import Toast from "react-native-toast-message";

const currencyOptions = [
  { label: "Dolar", value: "1" },
  { label: "Euro", value: "2" },
  { label: "Türk Lirası", value: "3" },
];
const stockOptions = [
  { label: "Adet", value: "Piece" },
  { label: "Santimetre", value: "cm" },
  { label: "Düzine", value: "Dozen" },
  { label: "Gram", value: "gram" },
  { label: "Kilogram", value: "kg" },
  { label: "Kişi", value: "Person" },
  { label: "Paket", value: "Package" },
  { label: "Metre", value: "metre" },
  { label: "Metre Kare", value: "m2" },
  { label: "Çift", value: "pair" },
];
const discountTypeOptions = [
  { label: "Yüzde Olarak İndirim", value: 1 },
  { label: "İndirimli Fiyatı Yaz", value: 0 },
];

function CreateProductScreen() {
  const Admin = useAppSelector((state) => state.Admin);

  const [product, setProduct] = useState({
    name: "",
    shortDetails: "",
    searchKeywords: "",
    detail: { details: "" },
    price1: 0,
    stockAmount: 0,
    tax: 18,
    taxIncluded: 0,
    discount: 0,
    moneyOrderDiscount: 0,
    warranty: 0,
    stockTypeLabel: "Piece",
    distributor: "",
    hasGift: 0,
    gift: "",
    status: 1,
    currency: { id: 3 },
    discountType: 0,
  });

  const autoGenerateFields = () => {
    const highestId =
      Admin.products.length > 0
        ? Math.max(...Admin.products.map((p) => p.id))
        : 0;

    const slug = product.name
      ? product.name.toLowerCase().replace(/\s+/g, "-")
      : "product-slug";

    return {
      slug,
      installmentThreshold: "-",
      categoryShowcaseStatus: 0,
      homeSortOrder: highestId + 1,
      popularSortOrder: highestId + 1,
      featuredSortOrder: highestId + 1,
      campaignedSortOrder: highestId + 1,
      newSortOrder: highestId + 1,
      discountedSortOrder: highestId + 1,
      midblockSortOrder: highestId + 1,
      pageTitle: product.name,
      metaDescription: product.shortDetails,
      metaKeywords: product.searchKeywords,
      canonicalUrl: `urun/${slug}`,
    };
  };

  const handleSubmit = () => {
    const requiredFields = [
      "name",
      "shortDetails",
      "searchKeywords",
      "detail",
      "price1",
      "stockAmount",
      "tax",
      "taxIncluded",
      "discount",
      "moneyOrderDiscount",
      "warranty",
      "stockTypeLabel",
      "distributor",
      "status",
      "currency",
      "discountType",
    ];

    for (let field of requiredFields) {
      if (!product[field] && product[field] !== 0) {
        Toast.show({
          type: "error",
          text1: "Lütfen tüm alanları doldurun",
        });
        return;
      }
    }

    if (product.hasGift === 1 && !product.gift)
      return Toast.show({
        type: "error",
        text1: "Lütfen hediye açıklamasını doldurun",
      });

    if (product.discount == 0) product["discountType"] = 1; // If there is no discount, discountType should be percentage value

    const autoFields = autoGenerateFields();
    const newProduct = { ...product, ...autoFields };
    console.log("Product Created:", newProduct);

    Toast.show({
      type: "success",
      text1: "Ürün başarıyla oluşturuldu",
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <AdminScreenNavbar screenTitle="Ürün Oluştur" />

      <ScrollView showsVerticalScrollIndicator={false} className="bg-white p-4">
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Ürün İsmi</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Ürün ismini girin"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">
            Kısa Açıklama
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Kısa açıklama girin"
            value={product.shortDetails}
            onChangeText={(text) =>
              setProduct({ ...product, shortDetails: text })
            }
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">
            Anahtar Kelimeler
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Virgül ile ayırarak girin"
            value={product.searchKeywords}
            onChangeText={(text) =>
              setProduct({ ...product, searchKeywords: text })
            }
          />
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 font-semibold mb-2">Fiyat</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Ürün fiyatını girin"
                keyboardType="numeric"
                value={product.price1.toString()}
                onChangeText={(text) =>
                  setProduct({ ...product, price1: parseFloat(text) || 0 })
                }
              />
            </View>

            <View className="flex-1 ml-2">
              <Text className="text-gray-700 font-semibold mb-2">
                Para Birimi
              </Text>

              <CustomSelect
                options={currencyOptions}
                title="Para Birimi Seçin"
                selectedValue={{
                  label: currencyLabelTranslator(
                    product.currency.id.toString()
                  ),
                  value: product.currency.id.toString(),
                }}
                onSelect={({ value }) =>
                  setProduct({
                    ...product,
                    currency: { id: Number(value) },
                  })
                }
              />
            </View>
          </View>

          <View className="flex-row items-center gap-4 mt-3 flex-1">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                product.taxIncluded === 1 ? "bg-green-500" : "bg-gray-300"
              }`}
              onPress={() => setProduct({ ...product, taxIncluded: 1 })}
            >
              <Text className="text-white">KDV Dahil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${
                product.taxIncluded === 0 ? "bg-green-500" : "bg-gray-300"
              }`}
              onPress={() => setProduct({ ...product, taxIncluded: 0 })}
            >
              <Text className="text-white">KDV Hariç</Text>
            </TouchableOpacity>
          </View>
        </View>

        {product.taxIncluded == 0 ? (
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">
              KDV Oranı (%)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="KDV oranını girin"
              keyboardType="numeric"
              value={product.tax.toString()}
              onChangeText={(text) =>
                setProduct({
                  ...product,
                  tax: parseInt(text) || 0,
                })
              }
            />
          </View>
        ) : null}

        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1 mr-2">
            <Text className="text-gray-700 font-semibold mb-2">Stok Adeti</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Stok adeti girin"
              keyboardType="numeric"
              value={product.stockAmount.toString()}
              onChangeText={(text) =>
                setProduct({
                  ...product,
                  stockAmount: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-gray-700 font-semibold mb-2">Stok Tipi</Text>
            <CustomSelect
              options={stockOptions}
              title="Stok Tipi Seçin"
              selectedValue={{
                label: stockTypeLabelTranslator(product.stockTypeLabel),
                value: product.stockTypeLabel,
              }}
              onSelect={({ value }) =>
                setProduct({
                  ...product,
                  stockTypeLabel: value,
                })
              }
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-2">Distribütör</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Distribütör bilgisi girin"
            value={product.distributor}
            onChangeText={(text) =>
              setProduct({
                ...product,
                distributor: text,
              })
            }
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Garanti Süresi (Ay)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Garanti süresini ay cinsinden girin"
            keyboardType="numeric"
            value={product.warranty.toString()}
            onChangeText={(text) =>
              setProduct({
                ...product,
                warranty: parseInt(text) || 0,
              })
            }
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="mb-4 flex-1 mr-4">
            <Text className="text-gray-700 font-semibold mb-2">
              {product.discountType == 1
                ? "İndirim Yüzdesi (%)"
                : "İndirimli Fiyat"}
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="İndirim değerini girin"
              keyboardType="numeric"
              value={product.discount.toString()}
              onChangeText={(text) =>
                setProduct({
                  ...product,
                  discount: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View className="mb-4 flex-1">
            <Text className="text-gray-700 font-semibold mb-2">
              İndirim Türü
            </Text>
            <CustomSelect
              options={discountTypeOptions}
              title="İndirim Türü Seçin"
              selectedValue={{
                label:
                  product.discountType === 1
                    ? "Yüzde Olarak İndir"
                    : "İndirimli Fiyatı Yaz",
                value: product.discountType.toString(),
              }}
              onSelect={({ value }) =>
                setProduct({
                  ...product,
                  discountType: Number(value),
                })
              }
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Havale İndirimi (%)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Havale indirim oranını girin"
            keyboardType="numeric"
            value={product.moneyOrderDiscount.toString()}
            onChangeText={(text) =>
              setProduct({
                ...product,
                moneyOrderDiscount: parseInt(text) || 0,
              })
            }
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Detaylı Açıklama
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 min-h-48 max-h-64"
            placeholder="Ürünle ilgili detaylı açıklama girin"
            multiline
            numberOfLines={4}
            value={product.detail.details}
            onChangeText={(text) =>
              setProduct({
                ...product,
                detail: { details: text },
              })
            }
          />
        </View>

        <View className="flex-row items-center mb-4">
          <Text className="text-gray-700 font-semibold mr-2">
            Ürün Durumu: {product.status == 1 ? "Aktif" : "Pasif"}
          </Text>
          <Switch
            value={product.status == 1}
            onValueChange={(value) =>
              setProduct({
                ...product,
                status: value ? 1 : 0,
              })
            }
          />
        </View>

        <View className="flex-row items-center mb-4">
          <Text className="text-gray-700 font-semibold mr-2">
            Hediye Var mı?
          </Text>
          <Switch
            value={product.hasGift === 1}
            onValueChange={(value) =>
              setProduct({
                ...product,
                hasGift: value ? 1 : 0,
                gift: value ? product.gift : "", // if there's no gift, then leave the gift field empty
              })
            }
          />
        </View>

        {product.hasGift == 1 ? (
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">
              Hediye Açıklaması
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Hediye açıklamasını girin"
              value={product.gift}
              onChangeText={(text) =>
                setProduct({
                  ...product,
                  gift: text,
                })
              }
            />
          </View>
        ) : null}

        <TouchableOpacity
          className="bg-black py-3 mb-3 rounded-lg items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Ürünü Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateProductScreen;
