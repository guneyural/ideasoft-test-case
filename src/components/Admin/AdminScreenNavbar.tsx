import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppSelector } from "../../helpers/reduxHooks";

interface Props {
  screenTitle: string;
}

function AdminScreenNavbar({ screenTitle }: Props) {
  const IsAdminSliceLoading = useAppSelector((state) => state.Admin.isLoading);
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center py-2 border-b-[1px] border-b-gray-200">
      <View className="flex-1">
        <TouchableOpacity
          className="h-[35px] w-[35px] items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
      </View>

      <View className="flex-4 items-center">
        <Text className="font-extrabold text-lg text-center">
          {screenTitle}
        </Text>
      </View>

      <View className="flex-1 items-end">
        {IsAdminSliceLoading ? (
          <Image
            source={require("../../../assets/loading.gif")}
            className="h-[20px] w-[40px]"
          />
        ) : null}
      </View>
    </View>
  );
}

export default AdminScreenNavbar;
