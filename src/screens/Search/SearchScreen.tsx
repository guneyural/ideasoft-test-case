import { SafeAreaView, Text, View } from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";

function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Search</Text>
      </View>

      <BottomNavigationBar currentScreen="SearchScreen" />
    </SafeAreaView>
  );
}

export default SearchScreen;
