import { Text } from "@/components/ui/text";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={60} // Scrolls the form up when focused
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="bg-card dark:bg-button"
      >
        <View className="bg-card dark:bg-button w-full pt-14 items-center">
          <Image source={images.loginBg} className="w-24 h-24" />
          <Text className="text-[34px] text-white font-bold text-center">
            Welcome Back
          </Text>
          <Text className="text-[20px] font-semibold text-white px-4 text-center leading-[27px]">
            Discover delicious recipes for a healthier you
          </Text>
        </View>

        <View className="bg-white dark:bg-black rounded-t-[40px] px-10 py-5 ">
          <LoginForm />
          <SocialLogin />
          <TouchableOpacity
            className="bg-transparent"
            onPress={() => router.push("/signup")}
          >
            <Text className="text-colored font-semibold text-[18px] py-4 text-center">
              Not a member? Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
