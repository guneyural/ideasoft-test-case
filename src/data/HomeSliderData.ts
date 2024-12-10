import { ImageSourcePropType } from "react-native";

export type sliderItemType = {
  imagePath: ImageSourcePropType;
  sliderTitle: string;
  sliderBody: string;
};

const sliderData: sliderItemType[] = [
  {
    imagePath: require("../../assets/sliderImage.png"),
    sliderBody: "Birinci Slaytın İçeriği",
    sliderTitle: "Birinci Slaytın Başlığı",
  },
  {
    imagePath: require("../../assets/sliderImage.png"),
    sliderBody: "İkinci Slaytın İçeriği",
    sliderTitle: "İkinci Slaytın Başlığı",
  },
];

export default sliderData;
