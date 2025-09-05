import { Button, ButtonText } from "@/components/ui/button";
import { images } from "@/constants/images";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

import { signInWithGoogle } from "@/services/firebase/auth";
import { useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();
const router = useRouter();

// FIXED: SocialLogin.js
const SocialLogin = () => {
  const router = useRouter();

  const redirectUri = makeRedirectUri({
    scheme: "com.expo.flavorly",
    path: "/(auth)",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  useEffect(() => {
    console.log("Google Auth Response:", response);
    if (response?.type === "success") {
      // FIXED: Process the response directly, don't call promptAsync again
      handleGoogleSignIn(response);
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
    }
  }, [response]);

  // FIXED: Accept the response as parameter instead of calling promptAsync
  const handleGoogleSignIn = async (authResponse: any): Promise<void> => {
    try {
      const result = await signInWithGoogle(authResponse);
      console.log(result, "in social comp");

      if (result.success) {
        router.replace("/(tabs)"); // Use replace instead of push
        console.log("Google sign-in successful:", result.user);
      } else {
        console.error("Google sign-in failed:", result.error);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <View className="flex flex-col pt-10 justify-between">
      <View className="justify-between items-center flex-row">
        <View className="w-[20%] h-[2px] bg-gray-200" />
        <Text className="text-gray-500 text-[18px] font-semibold">
          Or continue with
        </Text>
        <View className="w-[20%] h-[2px] bg-gray-200" />
      </View>

      <View className="flex justify-between gap-6 flex-row mt-6 items-center">
        <Button
          disabled={!request}
          onPress={() => promptAsync()} // This triggers the auth flow
          className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center"
        >
          <Image source={images.googleIcon} className="w-14 h-14" />
          <ButtonText className="text-red-600 font-bold text-[20px]">
            Google
          </ButtonText>
        </Button>

        <Button className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center">
          <Image source={images.facebookIcon} className="w-9 h-9" />
          <ButtonText className="text-blue-600 font-bold text-[20px]">
            Facebook
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default SocialLogin;
