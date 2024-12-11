import { SafeAreaView, View, ScrollView, StatusBar } from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";
import HomeScreenSearchBar from "../../components/HomeScreen/HomeScreenSearchBar";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigators/BottomTabs";
import Slider from "../../components/HomeScreen/Slider";
import sliderData from "../../data/HomeSliderData";
import BlackImageGallerySection from "../../components/HomeScreen/BlackImageGallerySection";
import BlackGallerySectionData from "../../data/BlackGallerySectionData";
import CategoriesSection from "../../components/HomeScreen/CategoriesSection";
import HomeScreenCategoriesData from "../../data/HomeScreenCategoriesData";
import TimeToTakeActionSection from "../../components/HomeScreen/TimeToTakeActionSection";
import TopSellersSection from "../../components/HomeScreen/TopSellersSection";
import SubscribeEmailSection from "../../components/HomeScreen/SubscribeEmailSection";
import { useEffect } from "react";
import { useAppDispatch } from "../../helpers/reduxHooks";
import { fetchHomeScreenProducts } from "../../store/slices/Product/ProductSlice";

type NavigationProps = BottomTabNavigationProp<TabParamList, "Home">;
function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeScreenProducts());
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View className="flex-1 pt-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeScreenSearchBar
            navigateToSearchScreen={() => navigation.navigate("SearchScreen")}
          />

          <View className="my-3 px-2">
            <Slider sliderData={sliderData} />
          </View>

          <BlackImageGallerySection images={BlackGallerySectionData} />

          <CategoriesSection categories={HomeScreenCategoriesData} />

          <View className="bg-stone-50">
            <TimeToTakeActionSection />

            <TopSellersSection />
          </View>

          <SubscribeEmailSection />
        </ScrollView>
      </View>

      <BottomNavigationBar currentScreen="Home" />
    </SafeAreaView>
  );
}

export default HomeScreen;
