import { FlatList, SafeAreaView, Text, View } from "react-native";
import AdminScreenNavbar from "../../components/Admin/AdminScreenNavbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import { fetchAdminPanelProducts } from "../../store/slices/Admin/AdminSlice";
import ProductItem from "../../components/Product/ProductItem";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ProductDetailsScreenProps = NativeStackScreenProps<
  ApplicationStackParamList,
  "AdminProductsScreen"
>;

function AdminProductsScreen({ navigation }: ProductDetailsScreenProps) {
  const dispatch = useAppDispatch();
  const Admin = useAppSelector((state) => state.Admin);

  useEffect(() => {
    if (Admin.products.length == 0) dispatch(fetchAdminPanelProducts());
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AdminScreenNavbar screenTitle="Ürünler" />

      <View className="pl-5 flex-1">
        <FlatList
          data={Admin.products}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="w-full flex-1 pr-5 mt-3">
              <TouchableOpacity
                className="bg-green-800 flex-1 py-2 rounded-xl mb-4 flex-row items-center justify-center gap-2"
                onPress={() => navigation.navigate("CreateProductScreen")}
              >
                <AntDesign name="plus" color="white" size={20} />

                <Text className="font-bold text-white text-center text-lg">
                  Yeni Ürün Ekle
                </Text>
              </TouchableOpacity>

              {!Admin.isLoading && Admin.products.length == 0 ? (
                <Text className="mt-6 text-center text-black">
                  Mağazanızda Ürün Bulunmamaktadır
                </Text>
              ) : null}
            </View>
          }
          renderItem={({ item }) => (
            <View className="mb-5">
              <ProductItem product={item} adminView />
            </View>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

export default AdminProductsScreen;
