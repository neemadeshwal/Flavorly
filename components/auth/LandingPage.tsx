import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../ui/text";

const { width, height } = Dimensions.get("window");

const LandingScreen = () => {
  const router = useRouter();

  // Responsive spacing based on screen height
  const isSmallScreen = height < 700; // iPhone SE and similar
  const isMediumScreen = height >= 700 && height < 850; // iPhone 12, 13, 14
  const isLargeScreen = height >= 850; // iPhone 14 Plus, 15 Plus, 16 Pro Max

  const getResponsiveStyles = () => {
    if (isSmallScreen) {
      return {
        topSpacing: 40,
        foodItemsGap: 20,
        textToButtonGap: 20,
        bottomSpacing: 30,
        fontSize: 24,
        lineHeight: 32,
      };
    } else if (isMediumScreen) {
      return {
        topSpacing: 60,
        foodItemsGap: 30,
        textToButtonGap: 26,
        bottomSpacing: 50,
        fontSize: 28,
        lineHeight: 40,
      };
    } else {
      return {
        topSpacing: 80,
        foodItemsGap: 36,
        textToButtonGap: 32,
        bottomSpacing: 60,
        fontSize: 32,
        lineHeight: 44,
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <ScrollView
      className="bg-card dark:bg-button w-full h-full relative px-4"
      contentContainerStyle={{ minHeight: height }}
    >
      <Image className="absolute top-[50px] left-0 " source={images.bgLeft} />
      <Image
        style={{ position: "absolute", top: -10, right: 0 }}
        source={images.bgRight}
      />
      <Image
        style={{
          position: "absolute",
          height: height / 2,
          width: width,
          top: height * 0.5,
          right: 0,
        }}
        resizeMode="cover"
        source={images.bgDown}
      />

      <View className="flex-1 justify-center items-center w-full px-[16px]">
        {/* Main content container - everything centered together */}
        <View
          className="items-center w-full"
          style={{ gap: styles.textToButtonGap * 2 }}
        >
          {/* Decorative food items section */}
          <View className="items-center relative">
            <View style={{ gap: styles.foodItemsGap }}>
              <Image className="absolute h-full" source={images.bgLeaves} />
              <Image
                className="mx-1 top-10 absolute right-0"
                source={images.leafRight}
              />
              <Image
                className="mx-1 absolute left-0 top-24"
                source={images.leafLeft}
              />
              <View className="flex-row justify-between w-full mt-4 px-[20px]">
                <Image className="mx-1" source={images.egg} />
                <Image className="mx-1" source={images.salmon} />
              </View>
              <View className="flex-row justify-between w-full px-[60px]">
                <View className="mx-1">
                  <Image className="mb-[-20px]" source={images.pea} />
                  <Image className="-rotate-[12deg]" source={images.pea} />
                </View>
                <Image className="mx-1" source={images.lemon} />
              </View>
              <View className="flex-row justify-between w-full px-[20px]">
                <Image className="mx-1" source={images.cheese} />
                <Image className="mx-1" source={images.chicken} />
              </View>
            </View>
          </View>

          {/* Text and CTA section */}
          <View className="w-full z-10" style={{ gap: styles.textToButtonGap }}>
            <Text
              className="text-white text-center font-bold"
              style={{
                fontSize: styles.fontSize,
                lineHeight: styles.lineHeight,
              }}
            >
              Help your path to health goals with happiness
            </Text>
            <View style={{ gap: styles.textToButtonGap }}>
              <TouchableOpacity
                onPress={() => router.push("/(auth)")}
                className="bg-button py-[16px] text-center rounded-[16px]"
              >
                <Text className="text-white text-center text-[18px]">
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text className="text-white font-bold text-center text-[18px]">
                  Create New Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LandingScreen;
