import { SafeAreaView, Text, View } from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";

function AdminPanelScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Admin Panel</Text>
      </View>

      <BottomNavigationBar currentScreen="AdminPanel" />
    </SafeAreaView>
  );
}

export default AdminPanelScreen;
