import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import BottomNavigationBar from "../Navbars/BottomNavigationBar";

type Props = {
  navigateToHome: () => void;
};

function EmptyShoppingCartDialog({ navigateToHome }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <View className="items-center gap-4">
          <AntDesign name="exclamationcircle" size={25} />

          <Text>Alışveriş sepetinizde ürün bulunmamaktadır.</Text>

          <TouchableOpacity
            className="flex flex-row gap-3 items-center bg-black px-5 py-4 rounded-lg mt-3 mb-5"
            onPress={navigateToHome}
          >
            <Text className="text-white text-sm font-medium">
              ALIŞVERİŞE BAŞLA
            </Text>
            <Feather name="arrow-right" color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavigationBar currentScreen="ShoppingCart" />
    </SafeAreaView>
  );
}

export default EmptyShoppingCartDialog;
