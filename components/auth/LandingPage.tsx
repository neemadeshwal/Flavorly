import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("window");
const LandingScreen = () => {
  const router = useRouter();

  return (
    <View className="bg-card w-full h-full relative px-4">
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
      <View className="flex flex-col justify-center mt-8 items-center w-full h-full gap-16 px-[16px]">
        <View className=" gap-[36px] ">
          <Image className=" absolute h-full" source={images.bgLeaves} />
          <Image
            className=" mx-1 top-10 absolute right-0"
            source={images.leafRight}
          />
          <Image
            className=" mx-1 absolute left-0 top-24"
            source={images.leafLeft}
          />
          <View className="flex-row justify-between    w-full mt-4 px-[20px]">
            <Image className=" mx-1" source={images.egg} />
            <Image className=" mx-1" source={images.salmon} />
          </View>
          <View className="flex-row justify-between  w-full px-[60px]">
            <View className="mx-1">
              <Image className="mb-[-20px] " source={images.pea} />
              <Image className="-rotate-[12deg]" source={images.pea} />
            </View>
            <Image className=" mx-1" source={images.lemon} />
          </View>
          <View className="flex-row justify-between w-full px-[20px]">
            <Image className=" mx-1" source={images.cheese} />
            <Image className=" mx-1" source={images.chicken} />
          </View>
        </View>
        <View className="gap-[26px] mt-5">
          <Text className="text-white text-center font-bold text-[28px] leading-[40px]">
            Help your path to health goals with happiness
          </Text>
          <View className="gap-[26px]">
            <TouchableOpacity
              onPress={() => router.push("/(auth)")}
              className="bg-button py-[16px] text-center rounded-[16px]"
            >
              <Text className="text-white text-center text-[18px]">Login</Text>
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
  );
};
export default LandingScreen;
