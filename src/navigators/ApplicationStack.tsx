import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetailsScreen from "../screens/Product/ProductDetailsScreen";
import AdminProductsScreen from "../screens/Admin/AdminProductsScreen";
import AdminCategoriesScreen from "../screens/Admin/AdminCategoriesScreen";
import CreateProductScreen from "../screens/Admin/CreateProductScreen";
import { ProductType } from "../store/slices/Product/types";

export type ApplicationStackParamList = {
  StartupScreen: undefined;
  ProductDetailsScreen: { id: string };
  AdminProductsScreen: undefined;
  AdminCategoriesScreen: undefined;
  CreateProductScreen: { product: ProductType | null; isUpdating: boolean };
};

const Stack = createStackNavigator<ApplicationStackParamList>();
const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function ApplicationStack(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="StartupScreen"
      >
        <Stack.Screen name="StartupScreen" component={BottomTabs} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="AdminProductsScreen"
          component={AdminProductsScreen}
        />
        <Stack.Screen
          name="AdminCategoriesScreen"
          component={AdminCategoriesScreen}
        />
        <Stack.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationStack;
