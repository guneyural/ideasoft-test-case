import { Text, TouchableOpacity, View } from "react-native";
import { Category } from "../../store/slices/Product/types";
import Antdesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch } from "../../helpers/reduxHooks";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import { deleteCategory } from "../../store/slices/Admin/AdminSlice";

interface Props {
  category: Category;
}

function CategoryItem({ category }: Props) {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  return (
    <View className="flex-row pr-6">
      <View className="flex-1">
        <Text>{category.name}</Text>
      </View>

      <TouchableOpacity
        className="bg-blue-600 w-[40px] h-[30px] justify-center items-center py-2 rounded-lg mr-5"
        onPress={() =>
          navigation.navigate("CreateCategoryScreen", {
            category,
            isUpdating: true,
          })
        }
      >
        <Antdesign name="edit" size={16} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-600 items-center rounded-lg w-[40px] h-[30px] justify-center"
        onPress={() =>
          dispatch(deleteCategory(category.id?.toString() as string))
        }
      >
        <Ionicons name="trash-outline" color="white" size={16} />
      </TouchableOpacity>
    </View>
  );
}

export default CategoryItem;
