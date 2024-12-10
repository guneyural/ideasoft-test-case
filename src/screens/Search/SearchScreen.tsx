import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomNavigationBar from "../../components/Navbars/BottomNavigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/reduxHooks";
import {
  clearSearchResults,
  fetchBrands,
  fetchCategories,
  searchProducts,
  setFilters_ProductSlice,
  setSearchResultsPage,
} from "../../store/slices/Product/ProductSlice";
import ProductItem from "../../components/Product/ProductItem";
import CustomSelect, {
  Option,
} from "../../components/SearchScreen/CustomSelect";
import { TouchableOpacity } from "react-native";
import FiltersModal from "../../components/SearchScreen/FiltersModal";
import normalizeSearchFilters from "../../helpers/normalizeSearchFilters";

function SearchScreen() {
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.product);

  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const [query, setQuery] = useState({
    s: "",
    sort: { label: "Önerilen Sıralama", value: "" },
  });

  const onSearchQueryChange = (val: string) => {
    dispatch(setSearchResultsPage(1));

    const newQuery = { ...query, s: val };

    setQuery(newQuery);
    dispatch(setFilters_ProductSlice(newQuery));

    if (val.length >= 2) {
      dispatch(
        searchProducts({
          ...query,
          sort: query.sort.value,
          s: val,
          page: 1,
        })
      );
    } else {
      dispatch(clearSearchResults());
    }
  };

  const handleSort = (sort: Option) => {
    dispatch(setSearchResultsPage(1));

    const newQuery = { ...query, sort };
    setQuery(newQuery);
    dispatch(setFilters_ProductSlice(newQuery));

    const normalizedSearchFilters = normalizeSearchFilters(
      Product.searchFilters
    );

    dispatch(
      searchProducts({
        ...normalizedSearchFilters,
        ...query,
        sort: sort?.value,
        page: 1,
      })
    );
  };

  const loadMore = () => {
    const normalizedSearchFilters = normalizeSearchFilters(
      Product.searchFilters
    );

    if (Product.canInfiniteScrollResults && !Product.isLoading) {
      dispatch(
        searchProducts({
          ...normalizedSearchFilters,
          ...query,
          s: query.s,
          sort: query.sort?.value,
          page: Product.searchResultsPage + 1,
        })
      );
    }
  };

  const openFiltersModal = () => {
    if (Product.categories.length == 0) dispatch(fetchCategories());
    if (Product.brands.length == 0) dispatch(fetchBrands());

    setIsFiltersModalVisible(!isFiltersModalVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 ">
        <View className="flex flex-row bg-gray-100 items-center gap-3 p-3 rounded-md mx-3">
          <Ionicons name="search" size={15} />

          <TextInput
            placeholder="Aramak istediğiniz ürünü yazınız"
            placeholderTextColor="#777"
            className="text-black flex-1 rounded-xl"
            onChangeText={onSearchQueryChange}
            value={query.s}
            autoCapitalize="none"
            autoFocus
          />

          {Product.isLoading ? (
            <Image
              source={require("../../../assets/loading.gif")}
              className="w-[40px] h-[15px]"
            />
          ) : null}
        </View>

        {query.s.length < 2 && Product.searchResults.length == 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-black text-center font-bold text-2xl">
              Aramak İstediğiniz Ürünü Yazınız...
            </Text>
          </View>
        ) : Product.searchResults.length == 0 && !Product.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-black text-center font-bold text-2xl">
              Ürün Bulunamadı
            </Text>
          </View>
        ) : null}

        <View className="pl-5 py-3 flex-1">
          <FlatList
            data={Product.searchResults}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              Product.searchResults.length != 0 ? (
                <View className="flex-row items-center justify-between pr-6 mb-4 w-full">
                  <CustomSelect
                    title="Sıralama"
                    options={[
                      { label: "Önerilen Sıralama", value: "" },
                      { label: "En Düşük Fiyat", value: "price1" },
                      { label: "En Yüksek Fiyat", value: "-price1" },
                      {
                        label: "Çok Değerlendirilenler",
                        value: "-popularSortOrder",
                      },
                      {
                        label: "Yüksek Puanlılar",
                        value: "-featuredSortOrder",
                      },
                      { label: "İndirim Oranı", value: "-discountedSortOrder" },
                      { label: "Yeni Eklenenler", value: "-newSortOrder" },
                    ]}
                    onSelect={(val) => handleSort(val)}
                    selectedValue={query.sort}
                  />

                  <View>
                    <Text className="text-gray-600 text-sm">
                      Toplam {Product.searchResults.length} ürün
                    </Text>

                    <TouchableOpacity
                      className="border-[1px] rounded-md border-gray-200 px-3 py-2 items-center mt-2 flex-row justify-between gap-1"
                      onPress={openFiltersModal}
                    >
                      <Ionicons name="filter" />

                      <Text>Filtreler</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <View className="mb-5">
                <ProductItem product={item} />
              </View>
            )}
            numColumns={2}
            onEndReachedThreshold={0.7}
            onEndReached={loadMore}
          />
        </View>

        {isFiltersModalVisible ? (
          <FiltersModal
            isModalVisible={isFiltersModalVisible}
            setIsModalVisible={setIsFiltersModalVisible}
          />
        ) : null}
      </View>

      <BottomNavigationBar currentScreen="SearchScreen" />
    </SafeAreaView>
  );
}

export default SearchScreen;
