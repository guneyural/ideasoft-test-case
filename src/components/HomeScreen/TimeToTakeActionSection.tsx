import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function TimeToTakeActionSection() {
  return (
    <View>
      <Image
        source={require("../../../assets/timeToTakeActionSectionImage.png")}
        className="h-[150px] w-full"
      />

      <Text className="text-black text-4xl font-extrabold italic m-2 mt-3">
        ŞİMDİ, HAREKETE GEÇME ZAMANI!
      </Text>

      <TouchableOpacity className="flex flex-row gap-3 items-center bg-white px-5 py-4 rounded-lg mt-2 mb-5 self-start">
        <Text className="text-black text-sm font-medium">ALIŞVERİŞE BAŞLA</Text>
        <Feather name="arrow-right" size={16} />
      </TouchableOpacity>
    </View>
  );
}

export default TimeToTakeActionSection;
