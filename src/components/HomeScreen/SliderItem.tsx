import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { sliderItemType } from "../../data/HomeSliderData";
import { TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");
// Parent container has px-2 property which is equal to paddingHorizontal: 8px.
// 8px for each side. 2 side equals to 16px. To get sliderWidth we need to subtract that value from windowWidth
const sliderWidth = width - 16;

function SliderItem({ item, index }: { item: sliderItemType; index: number }) {
  return (
    <View>
      <Image
        source={item.imagePath}
        className="h-[150px] rounded-lg p-1"
        style={styles.fullContainerWidth}
      />

      <View
        className={`mx-1 flex-col ${
          index % 2 == 0 ? "items-start" : "items-end"
        }`}
      >
        <View className={index % 2 == 0 ? "items-start" : "items-end"}>
          <Text className="text-black text-2xl font-extrabold italic mt-1">
            {item.sliderTitle}
          </Text>
          <Text className="text-gray-800 text-lg font-bold italic">
            {item.sliderBody}
          </Text>
        </View>

        <TouchableOpacity className="flex flex-row gap-3 items-center bg-white px-5 py-3 border-gray-100 border-2 rounded-lg mt-3">
          <Text className="text-black">BUTTON</Text>
          <Feather name="arrow-right" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainerWidth: { width: sliderWidth },
});

export default SliderItem;
