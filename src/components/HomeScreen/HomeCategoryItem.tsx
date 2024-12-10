import { Dimensions, Image, Text, View } from "react-native";
import { homeCategoriesItemType } from "../../data/HomeScreenCategoriesData";

type Props = {
  category: homeCategoriesItemType;
};

const { width } = Dimensions.get("window");

function HomeCategoryItem({ category }: Props) {
  return (
    <View>
      <Image
        source={category.imagePath}
        className="self-center my-2 rounded-xl"
        style={{ width: width - 15 }}
      />

      <View className="bg-black absolute bottom-[20px] left-[10px] py-2 px-3 rounded-lg">
        <Text className="text-white uppercase font-bold">{category.name}</Text>
      </View>
    </View>
  );
}

export default HomeCategoryItem;
