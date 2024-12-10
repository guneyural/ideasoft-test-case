import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import isValidEmail from "../../helpers/isValidEmail";

function SubscribeEmailSection() {
  const [mail, setMail] = useState("");

  const handlePress = () => {
    if (mail.length == 0)
      return Toast.show({
        type: "error",
        text1: "Lütfen geçerli bir e-posta adresi giriniz.",
      });

    if (!isValidEmail(mail))
      return Toast.show({
        type: "error",
        text1: "Lütfen geçerli bir e-posta adresi giriniz.",
      });

    Toast.show({
      type: "success",
      text1: "Haber listemize kayıt olduğunuz için teşekkürler!",
    });
    setMail("");
  };

  return (
    <View className="bg-black py-5 px-2 mt-16">
      <Text className="text-white text-3xl font-extrabold italic">
        HABERLER VE ÖZEL FIRSTALAR İÇİN E-POSTA ADRESİNİ KAYDET!
      </Text>

      <View className="bg-white rounded-xl mt-6 flex flex-row justify-between">
        <TextInput
          placeholder="E-posta adresiniz"
          placeholderTextColor="#777"
          className="p-3 text-black flex-1 rounded-xl py-5"
          onChangeText={(e) => setMail(e)}
          value={mail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          className="w-[60px] rounded-r-xl border-l-2 border-gray-100 items-center justify-center"
          onPress={handlePress}
        >
          <MaterialCommunityIcons name="arrow-right-top" size={21} />
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../../assets/subscribeEmailSectionImage.png")}
        className="mt-8"
      />
    </View>
  );
}

export default SubscribeEmailSection;
