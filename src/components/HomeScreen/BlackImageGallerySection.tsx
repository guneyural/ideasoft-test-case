import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { blackGalleryItemType } from "../../data/BlackGallerySectionData";

type Props = {
  images: blackGalleryItemType[];
};

function BlackImageGallerySection({ images }: Props) {
  return (
    <View className="bg-black py-5 px-2 mt-2">
      <Text className="text-white text-4xl font-extrabold italic">
        Oyunun Kurallarını Belirle!
      </Text>

      <TouchableOpacity className="flex flex-row gap-3 items-center bg-white px-5 py-4 rounded-lg mt-3 mb-5 self-start">
        <Text className="text-black text-sm font-medium">ALIŞVERİŞE BAŞLA</Text>
        <Feather name="arrow-right" size={16} />
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((item, index) => {
          return (
            <Image
              key={index}
              source={item.imagePath}
              className="h-[150px] w-[200px] mr-4 object-cover"
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default BlackImageGallerySection;
