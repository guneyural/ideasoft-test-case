import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AdminScreenNavbar from "../../components/Admin/AdminScreenNavbar";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import { useEffect } from "react";
import { fetchAdminPanelCategories } from "../../store/slices/Admin/AdminSlice";
import AntDesign from "react-native-vector-icons/AntDesign";
import CategoryItem from "../../components/Admin/CategoryItem";

type Props = NativeStackScreenProps<
  ApplicationStackParamList,
  "AdminCategoriesScreen"
>;
function AdminCategoriesScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const Admin = useAppSelector((state) => state.Admin);

  useEffect(() => {
    dispatch(fetchAdminPanelCategories());
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AdminScreenNavbar screenTitle="Kategoriler" />

      <View className="pl-5 flex-1">
        <FlatList
          data={Admin.categories}
          keyExtractor={(item) => item.id?.toString() as string}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="w-full flex-1 pr-5 mt-3">
              <TouchableOpacity
                className="bg-green-800 flex-1 py-2 rounded-xl mb-5 flex-row items-center justify-center gap-2"
                onPress={() =>
                  navigation.navigate("CreateCategoryScreen", {
                    category: null,
                    isUpdating: false,
                  })
                }
              >
                <AntDesign name="plus" color="white" size={20} />

                <Text className="font-bold text-white text-center text-lg">
                  Yeni Kategori Ekle
                </Text>
              </TouchableOpacity>

              {!Admin.isLoading && Admin.categories.length == 0 ? (
                <Text className="mt-6 text-center text-black">
                  Mağazanızda Kategori Bulunmamaktadır
                </Text>
              ) : null}
            </View>
          }
          renderItem={({ item }) => (
            <View className="mb-5">
              <CategoryItem category={item} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default AdminCategoriesScreen;
