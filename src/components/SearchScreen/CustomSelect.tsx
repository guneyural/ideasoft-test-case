import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onSelect: (value: Option) => void;
  selectedValue?: Option | null;
  title: string;
}

function CustomSelect({ options, onSelect, selectedValue, title }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (value: Option) => {
    onSelect(value);
    setIsModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        className="border border-gray-300 rounded-lg p-3 py-2 bg-white"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="text-gray-700 text-base">
          {selectedValue ? selectedValue.label : "Select an option"}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-4/5 bg-white rounded-lg p-4">
            <Text className="text-lg font-bold text-center mb-4">{title}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`rounded-md py-4 ${
                    selectedValue?.value == item.value
                      ? "bg-blue-500"
                      : "bg-white"
                  }`}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    className={`text-base text-center ${
                      selectedValue?.value == item.value
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 bg-gray-200 p-2 rounded-lg"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center text-gray-600">İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomSelect;
