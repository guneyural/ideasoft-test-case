import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { daysSinceCreation } from "../../helpers/dateCalculator";
import {
  calculateDiscountedPrice,
  calculateDiscountPercentage,
  calculateTaxIncludedValue,
  formatPrice,
} from "../../helpers/priceCalculator";
import { TouchableOpacity } from "react-native";
import { truncateText } from "../../helpers/text";
import { ProductType } from "../../store/slices/Product/types";
import { useAppDispatch } from "../../helpers/reduxHooks";
import { addToCart } from "../../store/slices/ShoppingCart/ShoppingCartSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Antdesign from "react-native-vector-icons/AntDesign";
import { deleteProduct } from "../../store/slices/Admin/AdminSlice";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";

const { width } = Dimensions.get("window");
const cardWidth = Math.floor(width / 2 - 24);

type Props = {
  product: ProductType;
  adminView: boolean;
};

function ProductItem({ product, adminView = false }: Props) {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  return (
    <Pressable
      className="p-2 mr-4 rounded-md flex-col justify-between border-2 border-gray-50"
      style={{ width: cardWidth }}
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", {
          id: product.id.toString(),
        })
      }
    >
      <View>
        <View className={`h-[130px] items-center justify-center`}>
          <View className="absolute top-0 left-0 z-10">
            {product.stockAmount > 0 ? (
              <>
                {daysSinceCreation(product.createdAt) <= 2 ? (
                  <View className="bg-white p-1 border-[1px] border-slate-200 rounded-md self-start">
                    <Text className="text-[10px] font-medium">YENİ</Text>
                  </View>
                ) : null}

                {product.hasGift == 1 ? (
                  <View className="bg-white p-1 border-[1px] border-slate-200 rounded-md self-start mt-1">
                    <Text className="text-[10px] font-medium">HEDİYELİ</Text>
                  </View>
                ) : null}
              </>
            ) : null}
          </View>

          <Image
            source={
              product.images.length > 0
                ? { uri: product.images[0] }
                : require("../../../assets/nopic_image.png")
            }
            className="w-[100px] h-[100px] rounded-md"
            resizeMode="contain"
          />

          {product.stockAmount <= 0 ? (
            <View className="absolute bg-white p-2 border-[1px] border-slate-200 rounded-md">
              <Text className="text-xs font-medium">TÜKENDİ</Text>
            </View>
          ) : null}
        </View>

        <Text className="text-black font-medium">
          {truncateText(product.name, 50)}
        </Text>

        {product.discount == 0 ? (
          <Text className="mt-4 font-bold">
            {product.taxIncluded
              ? formatPrice(product.price1, product.currency.id)
              : calculateTaxIncludedValue(
                  product.tax,
                  product.price1,
                  product.currency.id
                )}
          </Text>
        ) : (
          <View className="mt-3">
            <Text
              className="text-sm font-semibold text-gray-500"
              style={{ textDecorationLine: "line-through" }}
            >
              {product.taxIncluded
                ? formatPrice(product.price1, product.currency.id)
                : calculateTaxIncludedValue(
                    product.tax,
                    product.price1,
                    product.currency.id
                  )}
            </Text>

            <View className="flex flex-row items-center mt-1 gap-1">
              <Text className="font-extrabold">
                {calculateDiscountedPrice(
                  product.price1,
                  product.discount,
                  product.discountType,
                  product.tax,
                  product.taxIncluded,
                  product.currency.id
                )}
              </Text>

              {product.discountType == 1 ? (
                <Text className="text-red-500 font-bold">
                  -%{product.discount}
                </Text>
              ) : (
                <Text className="text-red-500 font-bold text-sm">
                  -%
                  {calculateDiscountPercentage(
                    product.price1,
                    product.discount,
                    product.tax,
                    product.taxIncluded
                  )}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>

      {adminView ? (
        <View className="flex-row gap-5 mt-4">
          <TouchableOpacity
            className="bg-blue-600 items-center py-2 rounded-lg flex-1"
            onPress={() =>
              navigation.navigate("CreateProductScreen", {
                product,
                isUpdating: true,
              })
            }
          >
            <Antdesign name="edit" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-600 items-center py-2 rounded-lg flex-1"
            onPress={() => dispatch(deleteProduct(product.id.toString()))}
          >
            <Ionicons name="trash-outline" color="white" size={20} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-black rounded-md py-2 mt-4 items-center justify-center"
          onPress={() => dispatch(addToCart(product))}
        >
          <Text className="text-white font-semibold">Sepete Ekle</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

export default ProductItem;
