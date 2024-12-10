import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigators/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import EmptyShoppingCartDialog from "../../components/ShoppingCart/EmptyShoppingCartDialog";
import Ionicons from "react-native-vector-icons/Ionicons";
import { clearCart } from "../../store/slices/ShoppingCart/ShoppingCartSlice";
import ShoppingCartItem from "../../components/ShoppingCart/ShoppingCartItem";
import ShoppingCartScreenFooter from "../../components/ShoppingCart/ShoppingCartScreenFooter";

type NavigationProps = BottomTabNavigationProp<TabParamList, "ShoppingCart">;
function ShoppingCart() {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProps>();

  const ShoppingCart = useAppSelector((state) => state.ShoppingCart);

  if (ShoppingCart.items.length == 0)
    return (
      <EmptyShoppingCartDialog
        navigateToHome={() => navigation.navigate("Home")}
      />
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-2">
        <FlatList
          data={ShoppingCart.items}
          ListHeaderComponent={() => (
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-bold text-lg">SEPET DETAYI</Text>

              <TouchableOpacity
                className="flex-row items-center gap-1"
                onPress={() => dispatch(clearCart())}
              >
                <Ionicons name="trash-outline" size={15} />
                <Text>Sepeti Boşalt</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(_, index: number) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ShoppingCartItem item={item} />}
          ItemSeparatorComponent={() => <View className="h-px bg-gray-200 " />}
        />

        <ShoppingCartScreenFooter
          onProceedToCheckout={() => {}}
          totalPrice={ShoppingCart.totalPrice}
        />
      </View>

      <BottomNavigationBar currentScreen="ShoppingCart" />
    </SafeAreaView>
  );
}

export default ShoppingCart;
