import { View } from "react-native";
import { homeCategoriesItemType } from "../../data/HomeScreenCategoriesData";
import HomeCategoryItem from "./HomeCategoryItem";

type Props = {
  categories: homeCategoriesItemType[];
};

function CategoriesSection({ categories }: Props) {
  return (
    <View className="my-4">
      {categories.map((item, index) => {
        return <HomeCategoryItem category={item} key={index} />;
      })}
    </View>
  );
}

export default CategoriesSection;
