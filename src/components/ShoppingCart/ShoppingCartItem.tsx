import { Image, Text, View } from "react-native";
import { CartItem } from "../../store/slices/ShoppingCart/types";
import { TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../helpers/reduxHooks";
import {
  removeFromCart,
  updateQuantity,
} from "../../store/slices/ShoppingCart/ShoppingCartSlice";
import {
  calculateDiscountedPrice,
  calculateTaxIncludedValue,
  formatPrice,
} from "../../helpers/priceCalculator";
import { stockTypeLabelTranslator, truncateText } from "../../helpers/text";

type Props = {
  item: CartItem;
};

function ShoppingCartItem({ item }: Props) {
  const dispatch = useAppDispatch();

  return (
    <View className="flex-row bg-white p-4 rounded-lg  mb-4">
      <View className="w-24 h-24 rounded-md justify-center items-center">
        <Image
          source={
            item.product.images.length > 0
              ? { uri: item.product.images[0] }
              : require("../../../assets/nopic_image.png")
          }
          className="w-full h-full rounded-md"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 px-4 justify-between">
        <Text className="font-semibold text-black text-lg">
          {truncateText(item.product.name, 30)}
        </Text>

        <View className="items-center self-start">
          <View className="flex-row items-center mt-2">
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  updateQuantity({
                    productId: item.product.id,
                    quantity: item.quantity - 1,
                  })
                )
              }
              className="w-8 h-8 bg-gray-300 rounded-md items-center justify-center"
            >
              <Text className="font-bold text-lg">-</Text>
            </TouchableOpacity>

            <Text className="mx-4 font-medium text-lg">{item.quantity}</Text>

            <TouchableOpacity
              onPress={() =>
                dispatch(
                  updateQuantity({
                    productId: item.product.id,
                    quantity: item.quantity + 1,
                  })
                )
              }
              className="w-8 h-8 bg-gray-300 rounded-md items-center justify-center"
            >
              <Text className="font-bold text-lg">+</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-sm mt-1">
            {stockTypeLabelTranslator(item.product.stockTypeLabel)}
          </Text>
        </View>
      </View>

      <View className="justify-between items-end">
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart(item.product.id))}
        >
          <Text className="text-gray-400 text-2xl">×</Text>
        </TouchableOpacity>

        <View>
          {item.product.discount > 0 ? (
            <View className="items-end">
              <Text
                className="text-gray-500 line-through text-sm"
                style={{ textDecorationLine: "line-through" }}
              >
                {formatPrice(item.product.price1, item.product.currency.id)}
              </Text>
              <Text className="text-black font-bold text-lg">
                {calculateDiscountedPrice(
                  item.product.price1,
                  item.product.discount,
                  item.product.discountType,
                  item.product.tax,
                  item.product.taxIncluded,
                  item.product.currency.id,
                  false
                )}
              </Text>
            </View>
          ) : (
            <Text className="text-black font-bold text-lg">
              {formatPrice(item.product.price1, item.product.currency.id)}
            </Text>
          )}

          {item.product.taxIncluded == 0 ? (
            <Text className="text-gray-500 text-sm">
              + KDV % {item.product.tax}
            </Text>
          ) : (
            <Text className="text-gray-500 text-sm">KDV Dahil</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default ShoppingCartItem;
