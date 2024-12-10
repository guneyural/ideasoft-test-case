import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { Text } from "react-native";
import { fetchProductById } from "../../store/slices/Product/ProductSlice";
import { daysSinceCreation } from "../../helpers/dateCalculator";
import {
  calculateDiscountedPrice,
  calculateDiscountPercentage,
  calculateMoneyOrderPrice,
  calculateTaxIncludedValue,
  formatPrice,
  getTaxExcludedPrice,
} from "../../helpers/priceCalculator";
import { addToCart } from "../../store/slices/ShoppingCart/ShoppingCartSlice";

type ProductDetailsScreenProps = NativeStackScreenProps<
  ApplicationStackParamList,
  "ProductDetailsScreen"
>;

function ProductDetailsScreen({
  route,
  navigation,
}: ProductDetailsScreenProps) {
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.Product);

  useEffect(() => {
    dispatch(fetchProductById(route.params.id));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center mx-2">
        <TouchableOpacity
          className="h-[35px] w-[35px] items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row bg-gray-100 items-center gap-3 p-3 mx-2 rounded-md flex-1"
          onPress={() =>
            navigation.navigate("StartupScreen", {
              screen: "SearchScreen",
            })
          }
        >
          <Ionicons name="search" size={15} />

          <Text className="text-gray-600">
            Aramak istediğiniz ürünü yazınız
          </Text>
        </TouchableOpacity>
      </View>

      {Product.isLoading && !Product.product ? (
        <Image
          source={require("../../../assets/loading.gif")}
          className="w-16 h-16 self-center"
        />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              className={`h-[200px] bg-gray-200 rounded-xl mx-3 my-3 items-center justify-center`}
            >
              <View className="absolute top-2 left-2 z-10">
                {Product.product?.stockAmount > 0 ? (
                  <>
                    {daysSinceCreation(Product.product?.createdAt) <= 2 ? (
                      <View className="bg-white p-1 border-[1px] border-slate-200 rounded-md self-start">
                        <Text className="text-[10px] font-medium">YENİ</Text>
                      </View>
                    ) : null}

                    {Product.product?.hasGift == 1 ? (
                      <View className="bg-white p-1 border-[1px] border-slate-200 rounded-md self-start mt-1">
                        <Text className="text-[10px] font-medium">
                          HEDİYELİ
                        </Text>
                      </View>
                    ) : null}
                  </>
                ) : null}
              </View>

              <Image
                source={
                  Product.product?.images.length > 0
                    ? { uri: Product.product?.images[0] }
                    : require("../../../assets/nopic_image.png")
                }
                className="w-[100px] h-[100px] rounded-md"
                resizeMode="contain"
              />

              {Product.product?.stockAmount <= 0 ? (
                <View className="absolute bg-white p-2 border-[1px] border-slate-200 rounded-md">
                  <Text className="text-xs font-medium">TÜKENDİ</Text>
                </View>
              ) : null}
            </View>

            <Text className="mx-3 text-xl font-bold">
              {Product.product?.name}
            </Text>

            {Product.product?.discount == 0 ? (
              <Text className="mx-3 mt-4 font-extrabold text-xl">
                {Product.product?.taxIncluded == 1
                  ? formatPrice(
                      Product.product?.price1,
                      Product.product?.currency.id
                    )
                  : calculateTaxIncludedValue(
                      Product.product?.tax,
                      Product.product?.price1,
                      Product.product?.currency.id
                    )}
              </Text>
            ) : (
              <View className="mx-3 mt-3">
                <Text
                  className="text-base font-semibold text-gray-600"
                  style={{ textDecorationLine: "line-through" }}
                >
                  {Product.product?.taxIncluded == 1
                    ? formatPrice(
                        Product.product?.price1,
                        Product.product?.currency.id
                      )
                    : calculateTaxIncludedValue(
                        Product.product?.tax,
                        Product.product?.price1,
                        Product.product?.currency.id
                      )}
                </Text>

                <View className="flex flex-row items-center mt-1 gap-1">
                  <Text className="font-extrabold text-2xl">
                    {calculateDiscountedPrice(
                      Product.product?.price1,
                      Product.product?.discount,
                      Product.product?.discountType,
                      Product.product?.tax,
                      Product.product?.taxIncluded,
                      Product.product?.currency.id
                    )}
                  </Text>

                  {Product.product?.discountType == 1 ? (
                    <Text className="text-red-500 font-bold text-base">
                      -%{Product.product?.discount}
                    </Text>
                  ) : (
                    <Text className="text-red-500 font-bold text-base">
                      -%
                      {calculateDiscountPercentage(
                        Product.product?.price1,
                        Product.product?.discount,
                        Product.product?.tax,
                        Product.product?.taxIncluded
                      )}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <View className="m-4 my-8">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-600 font-bold">Stok Kodu</Text>
                <Text className="text-gray-700">{Product.product?.sku}</Text>
              </View>

              {Product.product?.hasGift === 1 && (
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-gray-600 font-bold">Hediye</Text>
                  <Text className="text-gray-700">{Product.product?.gift}</Text>
                </View>
              )}

              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-600 font-bold">Garanti Süresi</Text>
                <Text className="text-gray-700">
                  {Product.product?.warranty == 0
                    ? "Yok"
                    : `${Product.product?.warranty} Ay`}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-600 font-bold">Fiyat</Text>
                <Text className="text-gray-700">
                  {Product.product?.taxIncluded == 0
                    ? `${Product.product?.price1.toFixed(2)}TL + KDV`
                    : `${getTaxExcludedPrice(
                        Product.product?.price1,
                        Product.product?.tax
                      )}TL + KDV`}
                </Text>
              </View>

              {Product.product?.moneyOrderDiscount > 0 ? (
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-gray-600 font-bold">Havale</Text>
                  <Text className="text-gray-700">
                    {calculateMoneyOrderPrice(
                      Product.product?.price1,
                      Product.product?.moneyOrderDiscount,
                      Product.product?.taxIncluded,
                      Product.product?.tax,
                      Product.product?.discountType,
                      Product.product?.discount
                    )}{" "}
                    TL (%{Product.product?.moneyOrderDiscount} havale indirimi)
                  </Text>
                </View>
              ) : null}
            </View>

            {Product.product?.detail ? (
              <View className="mx-4">
                <Text className="font-bold text-2xl text-gray-600">
                  Ürün Bilgisi
                </Text>

                <Text className="mt-1 text-base">
                  {Product.product?.detail?.details}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          <View className="flex-row items-center justify-between px-4 bg-white py-4 border-t-[1px] border-gray-100">
            {Product.product?.discount == 0 ? (
              <Text className="font-extrabold text-xl">
                {Product.product?.taxIncluded == 1
                  ? formatPrice(
                      Product.product?.price1,
                      Product.product?.currency.id
                    )
                  : calculateTaxIncludedValue(
                      Product.product?.tax,
                      Product.product?.price1,
                      Product.product?.currency.id
                    )}
              </Text>
            ) : (
              <View className="flex flex-row items-center mt-1 gap-1">
                <Text className="font-extrabold text-2xl">
                  {calculateDiscountedPrice(
                    Product.product?.price1,
                    Product.product?.discount,
                    Product.product?.discountType,
                    Product.product?.tax,
                    Product.product?.taxIncluded,
                    Product.product?.currency.id
                  )}
                </Text>
              </View>
            )}

            <TouchableOpacity
              className="bg-black py-3 px-4 rounded-lg"
              onPress={() => dispatch(addToCart(Product.product))}
            >
              <Text className="text-white font-semibold">Sepete Ekle</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default ProductDetailsScreen;
