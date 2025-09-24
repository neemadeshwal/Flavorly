import { Text } from "@/components/ui/text";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialLogin from "../login/SocialLogin";
import SignupForm from "./SignupForm";

const Signup = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="bg-card h-full">
          {/* Top Content */}
          <View style={{ alignItems: "center" }}>
            <Image
              source={images.signupBg}
              style={{ width: 112, height: 112 }}
            />
            <Text className="text-[34px] font-bold text-white text-center ">
              Join Our Community
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "white",
                textAlign: "center",
                paddingHorizontal: 16,
                marginTop: 8,
              }}
            >
              Start your journey to better nutrition and wellness today
            </Text>
          </View>

          {/* White Bottom Section */}
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingHorizontal: 24,
              paddingTop: 28,
              marginTop: 30,
              paddingBottom: 60, // Make room for keyboard
            }}
          >
            <SignupForm />

            <SocialLogin />

            <TouchableOpacity
              onPress={() => router.push("/(auth)")}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  textAlign: "center",
                }}
                className="text-colored"
              >
                Already a member? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
