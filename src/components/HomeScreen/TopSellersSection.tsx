import { FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../helpers/reduxHooks";
import ProductItem from "../Product/ProductItem";

function TopSellersSection() {
  const Product = useAppSelector((state) => state.product);

  return (
    <View className="mt-5">
      <Text className="text-2xl font-medium text-center mb-5">
        Çok Satanlar
      </Text>

      <FlatList
        data={Product.products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
}

export default TopSellersSection;
