import { FlatList, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "../../helpers/reduxHooks";

function TopSellersSection() {
  const Product = useAppSelector((state) => state.product);

  return (
    <View className="mt-5">
      <Text className="text-2xl font-medium text-center mb-5">
        Çok Satanlar
      </Text>

      <FlatList
        data={Product.products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

export default TopSellersSection;
