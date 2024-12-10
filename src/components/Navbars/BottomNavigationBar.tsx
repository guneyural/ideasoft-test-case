import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TabParamList } from "../../navigators/BottomTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type NavigationProps = BottomTabNavigationProp<TabParamList>;

type Props = {
  currentScreen: string;
};

function BottomNavigationBar({ currentScreen }: Props) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View className="flex-row items-center justify-between py-1 border-t-slate-100 border-t-[1px]">
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="flex-1 items-center py-2"
      >
        <Ionicons
          name={
            currentScreen?.toLowerCase() == "home" ? "home" : "home-outline"
          }
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SearchScreen")}
        className="flex-1 items-center py-2"
      >
        <Ionicons
          name={
            currentScreen?.toLowerCase() == "searchscreen"
              ? "search"
              : "search-outline"
          }
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ShoppingCart")}
        className="flex-1 items-center py-2"
      >
        <Ionicons
          name={
            currentScreen?.toLowerCase() == "shoppingcart"
              ? "cart"
              : "cart-outline"
          }
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AdminPanel")}
        className="flex-1 items-center py-2"
      >
        <MaterialCommunityIcons
          name={
            currentScreen?.toLowerCase() == "adminpanel"
              ? "view-dashboard-edit"
              : "view-dashboard-edit-outline"
          }
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavigationBar;
