import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  navigateToSearchScreen: () => void;
};

function HomeScreenSearchBar({ navigateToSearchScreen }: Props) {
  return (
    <TouchableOpacity
      className="flex flex-row bg-gray-100 items-center gap-3 p-3 mx-2 rounded-md w-full"
      onPress={navigateToSearchScreen}
    >
      <Ionicons name="search" size={15} />

      <Text className="text-gray-600">Aramak istediğiniz ürünü yazınız</Text>
    </TouchableOpacity>
  );
}

export default HomeScreenSearchBar;
