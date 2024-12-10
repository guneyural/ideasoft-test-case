import { ImageSourcePropType } from "react-native";

export type homeCategoriesItemType = {
  imagePath: ImageSourcePropType;
  name: string;
};

const HomeScreenCategoriesData: homeCategoriesItemType[] = [
  {
    imagePath: require("../../assets/womenCategory.png"),
    name: "Kadın",
  },
  {
    imagePath: require("../../assets/manCategory.png"),
    name: "Erkek",
  },
  {
    imagePath: require("../../assets/kidCategory.png"),
    name: "Çocuk",
  },
];

export default HomeScreenCategoriesData;
