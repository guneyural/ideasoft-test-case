import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { sliderItemType } from "../../data/HomeSliderData";
import SliderItem from "./SliderItem";

import { useState } from "react";

const { width } = Dimensions.get("window");

type Props = { sliderData: sliderItemType[] };

function Slider({ sliderData }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {sliderData.map((item, index) => (
          <SliderItem item={item} key={index} index={index} />
        ))}
      </ScrollView>

      <View className="flex flex-row items-center self-center mt-1">
        {sliderData.map((_, index) => (
          <View
            key={index}
            className={`w-[5px] h-[5px] rounded-full mx-1 ${
              currentIndex == index ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        ))}
      </View>
    </>
  );
}

export default Slider;
