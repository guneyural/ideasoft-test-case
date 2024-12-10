import { ImageSourcePropType } from "react-native";

export type blackGalleryItemType = {
  imagePath: ImageSourcePropType;
};

const BlackGallerySectionData: blackGalleryItemType[] = [
  {
    imagePath: require("../../assets/blackGallerySectionImage1.png"),
  },
  {
    imagePath: require("../../assets/blackGallerySectionImage2.png"),
  },
  {
    imagePath: require("../../assets/blackGallerySectionImage3.png"),
  },
];

export default BlackGallerySectionData;
