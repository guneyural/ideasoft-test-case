import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import { NavigationContainer } from "@react-navigation/native";

export type ApplicationStackParamList = {
  StartupScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationStack;