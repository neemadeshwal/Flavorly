import { Button, ButtonText } from "@/components/ui/button";
import { images } from "@/constants/images";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { signInWithFB, signInWithGoogle } from "@/services/firebase/auth";
import { useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();
const router = useRouter();

const SocialLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    if (response?.type === "success") {
      handleGoogleSignIn(response);
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
    }
  }, [response]);

  const handleGoogleSignIn = async (authResponse: any): Promise<void> => {
    setLoading(true);
    try {
      const result = await signInWithGoogle(authResponse);

      if (result.success) {
        router.replace("/(tabs)");
      } else {
        console.error("Google sign-in failed:", result.error);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFBSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await signInWithFB();

      if (result.success) {
        router.replace("/(tabs)");
      } else {
        console.error("FB sign-in failed:");
      }
    } catch (error) {
      console.error("fb sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    <View className="flex-1 gap-3 items-center w-full h-full bg-white/50 z-[1000]">
      <Spinner />
      <Text>Loading ...</Text>
    </View>;
  }
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
          onPress={() => promptAsync()}
          className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center"
        >
          <Image source={images.googleIcon} className="w-14 h-14" />
          <ButtonText className="text-red-600 font-bold text-[18px]">
            Google
          </ButtonText>
        </Button>

        <Button className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center">
          <Image source={images.facebookIcon} className="w-9 h-9" />
          <ButtonText
            onPress={handleFBSignIn}
            className="text-blue-600 font-bold text-[18px]"
          >
            Facebook
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default SocialLogin;
