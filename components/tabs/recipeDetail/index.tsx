import Creator from "@/components/tabs/recipeDetail/Creator";
import RecipeTabs from "@/components/tabs/recipeDetail/RecipeTabs";
import RelatedRecipe from "@/components/tabs/recipeDetail/RelatedRecipe";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useLikeRecipeMutation } from "@/Mutation/recipe";
import { useSingleRecipeDetails } from "@/Query/recipe";
import { useAuthStore } from "@/stores/useUserStore";
import { UserData } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BicepsFlexed, Clock, Pizza, Wheat, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";

const RecipeDetail = () => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const [isViewMoreActive, setIsViewMoreActive] = useState(false);

  const colorMode = useAuthStore.getState().colorScheme;
  const { id } = useLocalSearchParams();

  const recipeId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, error } = useSingleRecipeDetails(recipeId || "");

  const user = useAuthStore.getState().user;
  const favouriteMutation = useLikeRecipeMutation();

  useEffect(() => {
    if (
      user &&
      data &&
      data.recipe.favouriteArray &&
      data.recipe.favouriteArray.length
    ) {
      const isUserFav = data.recipe.favouriteArray.some(
        (fav: UserData) => fav.uid === user.uid
      );
      setIsLiked(!!isUserFav);
    }
  }, [user, data]);
  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    try {
      const response = await favouriteMutation.mutateAsync(data.recipe._id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#609ea3ff" />
        <Text className="mt-4 text-[16px]">Loading recipe...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-500 text-[18px] text-center mb-4">
          Failed to load recipe details
        </Text>
        <Button onPress={() => router.back()}>
          <Text className="text-white">Go Back</Text>
        </Button>
      </View>
    );
  }

  if (!data?.recipe) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-[18px] text-center mb-4">Recipe not found</Text>
        <Button onPress={() => router.back()}>
          <Text className="text-white">Go Back</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ImageBackground
        className="w-full h-[320px]"
        source={{
          uri: data.recipe.imageUrl,
        }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.8)", "transparent"]}
          className="absolute top-0 left-0 right-0 h-[150px] z-50 "
        />

        <Button
          onPress={() => router.push("/(tabs)")}
          className="bg-white shadow-xl absolute left-6 z-[1000] top-20"
        >
          <Icon as={X} className="text-black" />
        </Button>
        <Button
          onPress={handleLike}
          className="bg-white absolute right-6 shadow-xl top-20 z-[1000]"
        >
          {isLiked ? (
            <AntDesign name="heart" size={20} color="#609ea3ff" />
          ) : (
            <AntDesign name="hearto" size={20} color="black" />
          )}
        </Button>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white dark:bg-[#181818] px-6 py-8 z-50 -mt-5 rounded-t-[30px] mb-6"
      >
        <View>
          <View className="">
            <View className="flex justify-between items-center flex-row gap-4">
              <Text
                style={{ fontFamily: "PoppinsBold" }}
                className=" text-[26px] w-[76%]  capitalize"
              >
                {data.recipe.title}
              </Text>
              <View className="flex flex-row gap-2 absolute right-0 top-0 justify-center items-center">
                <Icon className="text-[#97A2B0] " as={Clock} />
                <Text className="text-[#97A2B0] mt-1 text-[16px]">
                  {data.recipe.timeTaken}
                </Text>
              </View>
            </View>
            <View className="relative">
              <Text
                numberOfLines={!isViewMoreActive ? 2 : undefined}
                className="text-[18px] text-[#748189] w-[78%] leading-[30px]"
              >
                {data.recipe.description}
              </Text>
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className="text-gray-800 absolute right-0 bottom-0 dark:text-gray-300 text-[15px]"
                onPress={() => setIsViewMoreActive((prevVal) => !prevVal)}
              >
                {" "}
                {isViewMoreActive ? "View less" : "View more"}
              </Text>
              {data.recipe.isVeg ? (
                <View className="border-2 absolute right-0  border-green-500 p-1">
                  <View className=" rounded-full bg-green-500 w-3 h-3"></View>
                </View>
              ) : (
                <View className="border-2 absolute right-0 border-red-500 p-1">
                  <View className=" rounded-full bg-red-500 w-3 h-3"></View>
                </View>
              )}
            </View>
          </View>
          <View className="pt-8">
            <View className="flex flex-row justify-between items-center">
              <View className="flex justify-start flex-column gap-5">
                <View className="flex flex-row gap-3 flex-start items-center justify-center">
                  <View className="bg-[#E6EBF2] dark:bg-[#121212] p-3 w-fit flex justify-center items-center rounded-xl">
                    <Icon
                      as={Wheat}
                      className=" w-7 h-7 text-black dark:text-white"
                    />
                  </View>
                  <Text className="text-[17px]">
                    {data.recipe.carbs} g carbs
                  </Text>
                </View>
                <View className="flex gap-3 items-center flex-start flex-row">
                  <View className="bg-[#E6EBF2] dark:bg-[#121212] p-3 w-fit flex justify-center items-center rounded-xl">
                    <SimpleLineIcons
                      name="fire"
                      size={24}
                      color={colorMode === "dark" ? "white" : "black"}
                    />
                  </View>
                  <Text className="text-[17px]">
                    {data.recipe.calories} kcal
                  </Text>
                </View>
              </View>
              <View className="flex justify-start gap-5 flex-column">
                <View className="flex flex-row gap-3 items-center ">
                  <View className="bg-[#E6EBF2] dark:bg-[#121212] p-3 w-fit flex justify-center items-center rounded-xl">
                    <Icon
                      className="w-7 h-7 text-black dark:text-white"
                      as={BicepsFlexed}
                    />
                  </View>
                  <Text className="text-[17px]">
                    {data.recipe.protein} g proteins
                  </Text>
                </View>
                <View className="flex flex-row gap-3 items-center ">
                  <View className="bg-[#E6EBF2] dark:bg-[#121212] p-3 w-fit flex justify-center items-center rounded-xl">
                    <Icon
                      as={Pizza}
                      className="w-7 h-7 text-bblack dark:text-white"
                    />
                  </View>
                  <Text className="text-[17px]">{data.recipe.fats} g fats</Text>
                </View>
              </View>
            </View>
          </View>
          <RecipeTabs
            ingredients={data.recipe.ingredients}
            timeTaken={data.recipe.timeTaken}
            instructions={data.recipe.instructions}
          />
          <Creator author={data.recipe.createdBy} />
          <RelatedRecipe id={recipeId} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetail;
