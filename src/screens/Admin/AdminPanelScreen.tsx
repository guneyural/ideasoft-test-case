import { FlatList, SafeAreaView, Text, View } from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigators/BottomTabs";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = BottomTabNavigationProp<TabParamList, "AdminPanel">;

const adminOptions = [
  {
    label: "Ürünler",
    navigateTo: "AdminProductsScreen",
  },
  {
    label: "Kategoriler",
    navigateTo: "AdminCategoriesScreen",
  },
];

function AdminPanelScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center py-2 border-b-[1px] border-b-gray-200">
        <Text className="font-extrabold text-lg">Yönetim Paneli</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <FlatList
          data={adminOptions}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View className="mb-5 w-1/2 p-3">
                <TouchableOpacity
                  className="bg-black rounded-lg p-5 items-center justify-center"
                  onPress={() => navigation.navigate(item.navigateTo)}
                >
                  <Text className="font-bold text-white">{item.label}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <BottomNavigationBar currentScreen="AdminPanel" />
    </SafeAreaView>
  );
}

export default AdminPanelScreen;
