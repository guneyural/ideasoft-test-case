import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import AdminPanelScreen from "../screens/Admin/AdminPanelScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import ShoppingCartScreen from "../screens/ShoppingCart/ShoppingCartScreen";

export type TabParamList = {
  Home: undefined;
  AdminPanel: undefined;
  SearchScreen: undefined;
  ShoppingCart: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function AppNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={() => null}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
