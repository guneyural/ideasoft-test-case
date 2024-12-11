import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSelect from "./CustomSelect";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import {
  searchProducts,
  setFilters_ProductSlice,
  setSearchResultsPage,
} from "../../store/slices/Product/ProductSlice";
import normalizeSearchFilters from "../../helpers/normalizeSearchFilters";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (val: boolean) => void;
};

function FiltersModal({ isModalVisible, setIsModalVisible }: Props) {
  const dispatch = useAppDispatch();

  const Product = useAppSelector((state) => state.Product);

  const [filterData, setFilterData] = useState(Product.searchFilters);

  const handleInputChange = (key: string, val: string) => {
    const newFilters = {
      ...filterData,
      [key]: val,
    };

    dispatch(setFilters_ProductSlice(newFilters));

    setFilterData(newFilters);
  };

  const handleSelectChange = (
    key: string,
    option: { label: string; value: string }
  ) => {
    const newFilters = {
      ...filterData,
      [key]: option,
    };

    dispatch(setFilters_ProductSlice(newFilters));
    setFilterData(newFilters);
  };

  const handleSubmit = () => {
    dispatch(setSearchResultsPage(1));
    setIsModalVisible(false);

    const normalizedSearchFilters = normalizeSearchFilters(
      Product.searchFilters
    );

    dispatch(searchProducts({ ...normalizedSearchFilters, page: 1 }));
  };

  return (
    <View className="flex-1 bg-transparent justify-center items-center">
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white w-full h-[90%] rounded-t-lg p-4">
            <View className="flex-row justify-between items-center border-b-[1px] pb-2 border-gray-200">
              <Text className="text-lg font-bold">Filtreler</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4">
              <View className="mb-4">
                <Text className="text-base font-medium mb-1">Kategoriler</Text>
                <CustomSelect
                  title="Kategori"
                  options={Product.categories.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onSelect={(value) => handleSelectChange("category", value)}
                  selectedValue={{
                    label:
                      filterData.category.value === ""
                        ? "Tümü"
                        : filterData.category.label,
                    value: filterData.category.value,
                  }}
                />
              </View>

              <View className="mb-4">
                <Text className="text-base font-medium mb-1">Markalar</Text>
                <CustomSelect
                  title="Marka"
                  options={Product.brands.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onSelect={(val) => handleSelectChange("brand", val)}
                  selectedValue={{
                    label:
                      filterData.brand.value === ""
                        ? "Tümü"
                        : filterData.brand.label,
                    value: filterData.brand.value,
                  }}
                />
              </View>

              <View className="mb-4">
                <Text className="text-base font-medium mb-1">Stok Kodu</Text>
                <TextInput
                  className="border-[1px] border-gray-300 rounded-md px-3 py-2"
                  placeholder="Stok kodu"
                  value={filterData.sku}
                  onChangeText={(value) => handleInputChange("sku", value)}
                />
              </View>

              <View className="mb-4 flex-row justify-between items-center">
                <View className="flex-1 mr-2">
                  <Text className="text-base font-medium mb-1">
                    Minimum Fiyat (TL)
                  </Text>
                  <TextInput
                    className="border-[1px] border-gray-300 rounded-md px-3 py-2"
                    placeholder="Min"
                    value={filterData.minPrice}
                    onChangeText={(value) =>
                      handleInputChange("minPrice", value)
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium mb-1">
                    Maksimum Fiyat (TL)
                  </Text>
                  <TextInput
                    className="border-[1px] border-gray-300 rounded-md px-3 py-2"
                    placeholder="Max"
                    value={filterData.maxPrice}
                    onChangeText={(value) =>
                      handleInputChange("maxPrice", value)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View className="flex-row items-center">
                <Switch
                  value={filterData.criticalStock == 0 ? true : false}
                  onValueChange={(val) =>
                    handleInputChange("criticalStock", val ? "0" : "1")
                  }
                  className="m-2"
                />
                <Text className="text-lg font-semibold">Stoktakiler</Text>
              </View>
            </ScrollView>

            <View className="mt-4">
              <TouchableOpacity
                className="bg-black rounded-md p-3 items-center"
                onPress={handleSubmit}
              >
                <Text className="text-white font-bold">Filtreleri Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default FiltersModal;
