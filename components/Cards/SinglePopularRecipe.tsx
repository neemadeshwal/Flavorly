import { useLikeRecipeMutation } from "@/Mutation/recipe";
import { useAuthStore } from "@/stores/useUserStore";
import { recipe, UserData } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { Clock, Dot } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import AnimatedPressable from "../animation";
import FadeInView from "../animation/FadeIn";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";

const SinglePopularRecipe = ({ item }: { item: recipe }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const { favouriteArray, _id } = item;
  const user = useAuthStore.getState().user;
  const favouriteMutation = useLikeRecipeMutation();

  useEffect(() => {
    if (user && favouriteArray && favouriteArray.length) {
      console.log(favouriteArray, "isfavoaurite array");
      const isUserFav = favouriteArray.some(
        (fav: UserData) => fav.uid === user.uid
      );
      console.log(isUserFav, "isuserfav");
      setIsLiked(!!isUserFav);
    }
  }, [user, favouriteArray]);

  const handleLike = async () => {
    try {
      const response = await favouriteMutation.mutateAsync(_id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLike();
  }, [isLiked]);

  return (
    <FadeInView duration={1000} delay={200} index={0} staggerDelay={150}>
      <AnimatedPressable
        scaleTo={1.07}
        onPress={() => router.push(`/recipe/${item._id}`)}
      >
        <View className="p-4 mr-6 flex flex-col gap-6 w-[240px] bg-white dark:bg-[#202225] rounded-[25px]">
          <View className="rounded-[20px] flex items-center justify-center w-full h-[170px] relative">
            <Image
              className="w-[200px] rounded-[20px] h-full"
              source={{ uri: item.imageUrl }}
            />

            <Button
              onPress={() => setIsLiked((prev) => !prev)}
              className="absolute right-6 top-2 bg-white rounded-md p-2"
            >
              {isLiked ? (
                <AntDesign name="heart" size={20} color="#609ea3ff" />
              ) : (
                <AntDesign name="hearto" size={20} color="black" />
              )}
            </Button>
          </View>
          <View>
            <View>
              <Text
                numberOfLines={1}
                style={{ fontFamily: "PoppinsBold" }}
                className="text-[19px]"
              >
                {item.title}
              </Text>
            </View>
            <View className="flex flex-row mt-2 justify-between items-center">
              <View className="flex flex-row gap-2 items-center">
                <SimpleLineIcons name="fire" size={24} color="gray" />
                <Text className="text-[#97A2B0] mt-1 text-[16px]">
                  {item.calories} kcal
                </Text>
              </View>
              <View className="">
                <Icon className="text-[#97A2B0] w-10 h-10" as={Dot} />
              </View>
              <View className="flex flex-row gap-2 justify-center items-center">
                <Icon className="text-[#97A2B0] " as={Clock} />
                <Text className="text-[#97A2B0] mt-1 text-[16px]">
                  {item.timeTaken}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
};

export default SinglePopularRecipe;
