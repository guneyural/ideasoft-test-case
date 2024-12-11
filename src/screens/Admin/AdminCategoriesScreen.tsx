import { SafeAreaView } from "react-native";
import { ApplicationStackParamList } from "../../navigators/ApplicationStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AdminScreenNavbar from "../../components/Admin/AdminScreenNavbar";

type Props = NativeStackScreenProps<
  ApplicationStackParamList,
  "AdminCategoriesScreen"
>;
function AdminCategoriesScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AdminScreenNavbar screenTitle="Kategoriler" />
    </SafeAreaView>
  );
}

export default AdminCategoriesScreen;
