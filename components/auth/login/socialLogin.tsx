import { Button, ButtonText } from "@/components/ui/button";
import { images } from "@/constants/images";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

import { signInWithFB, signInWithGoogle } from "@/services/firebase/auth";
import { useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();
const router = useRouter();

const SocialLogin = () => {
  // const [facebookRequest, facebookResponse, facebookPromptAsync] =
  //   Facebook.useAuthRequest({
  //     clientId: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID,
  //   });
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   if (response?.type === "success" && response?.authentication?.accessToken) {
  //     handleSignInWithGoogle(response.authentication.accessToken);
  //   } else if (response?.type === "cancel" || response?.type === "dismiss") {
  //   }
  // }, [response]);

  // useEffect(() => {
  //   if (
  //     facebookResponse &&
  //     facebookResponse.type === "success" &&
  //     facebookResponse.authentication
  //   ) {
  //     (async () => {
  //       const userInfoResponse = await fetch(
  //         `http://graph.facebook.com/me?access_token=${facebookResponse.authentication?.accessToken}`
  //       );
  //       const userInfo = await userInfoResponse.json();
  //       console.log(userInfo);
  //     })();
  //   }
  // }, [facebookResponse]);
  // async function handleSignInWithGoogle(token: string) {
  //   if (!token) return;

  //   try {
  //     const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const user = await res.json();
  //     setUser(user);
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const redirectUri = makeRedirectUri({
    scheme: process.env.EXPO_PUBLIC_BUNDLE_ID,
    path: "/(tabs)",
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID, // Add iOS client ID
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // Add web client ID,
  });

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const result = await signInWithGoogle(promptAsync);
      console.log(result, "in social comp");

      if (result.success) {
        router.push("/(tabs)");
        console.log("Google sign-in successful:", result.user);
      } else {
        console.error("Google sign-in failed:", result.error);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleFbSignIN = async () => {
    try {
      const result = await signInWithFB();
      if (result) {
        router.push("/(tabs)");
        console.log("fb sign-in successful:");
      }
    } catch (error) {
      console.error("fb signin error ", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn();
    } else if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
    }
  }, [response]);
  return (
    <View className="flex flex-col pt-10 justify-between">
      <View className="justify-between items-center   flex-row">
        <View className="w-[20%] h-[2px] bg-gray-200" />

        <Text className="text-gray-500 text-[18px] font-semibold">
          Or continue with
        </Text>
        <View className="w-[20%] h-[2px] bg-gray-200" />
      </View>
      <View className="flex justify-between gap-6 flex-row mt-6 items-center  ">
        <Button
          disabled={!request}
          onPress={() => promptAsync()}
          className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]  border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center"
        >
          <Image source={images.googleIcon} className="w-14 h-14" />
          <ButtonText className="text-red-600 font-bold text-[20px]">
            Google
          </ButtonText>
        </Button>
        <Button
          onPress={handleFbSignIN}
          className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]  border-2 border-gray-300 px-4 h-[66px] w-[47%] justify-center items-center"
        >
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
