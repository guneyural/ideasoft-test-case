import { SafeAreaView, Text, View } from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";

function ShoppingCart() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Shopping Cart</Text>
      </View>

      <BottomNavigationBar currentScreen="ShoppingCart" />
    </SafeAreaView>
  );
}

export default ShoppingCart;
