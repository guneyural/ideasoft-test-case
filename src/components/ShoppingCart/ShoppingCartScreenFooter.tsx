import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

type Props = {
  totalPrice: number;
  onProceedToCheckout: () => void;
};

const ShoppingCartScreenFooter: React.FC<Props> = ({
  totalPrice,
  onProceedToCheckout,
}) => {
  return (
    <View className="bg-white px-3 py-2 border-t border-gray-200 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-black">
        Toplam: {totalPrice.toFixed(2)}₺
      </Text>
      <TouchableOpacity
        className="bg-black px-4 py-2 rounded-md"
        onPress={onProceedToCheckout}
      >
        <Text className="text-white font-semibold">Ödeme Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCartScreenFooter;
