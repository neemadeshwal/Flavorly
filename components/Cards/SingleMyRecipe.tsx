import { useLikeRecipeMutation } from "@/Mutation/recipe";
import { useAuthStore } from "@/stores/useUserStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { Clock, Edit, Trash } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import AnimatedPressable from "../animation";
import FadeInView from "../animation/FadeIn";
import { Button, ButtonText } from "../ui/button";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";

const SingleRecipeCard = ({
  item,
  setSelectedRecipe,
  setIsDeleteContainer,
  setIsEditContainer,
}: any) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const { favouriteArray, _id } = item;
  const user = useAuthStore.getState().user;
  const favouriteMutation = useLikeRecipeMutation();

  useEffect(() => {
    if (user && favouriteArray && favouriteArray.length) {
      console.log(favouriteArray, "isfavoaurite array");
      const isUserFav = favouriteArray.some((fav: any) => fav.uid === user.uid);
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
        <Pressable
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
          className="h-auto mb-8"
          onPress={() => router.push(`/recipe/${item._id}`)}
        >
          <View className="p-4 flex flex-col gap-4 bg-white dark:bg-[#202225] rounded-[25px]">
            <View className="flex items-center justify-center w-full h-[200px] relative">
              <Image
                className="w-full rounded-[20px] h-full "
                source={{ uri: item.imageUrl }}
                style={{ resizeMode: "cover" }}
              />
              <Button
                onPress={(e) => {
                  e.stopPropagation();
                }}
                className="absolute right-2 top-2 bg-white rounded-md p-2"
              >
                {isLiked ? (
                  <AntDesign name="heart" size={18} color="#609ea3ff" />
                ) : (
                  <AntDesign name="hearto" size={18} color="black" />
                )}
              </Button>
            </View>
            <View className="relative">
              <Text
                numberOfLines={1}
                style={{ fontFamily: "PoppinsBold" }}
                className="text-[17px] mb-2 w-[80%]"
              >
                {item.title}
              </Text>
              <View className="flex gap-6 flex-row absolute right-0">
                <Button
                  onPress={() => {
                    setSelectedRecipe(item);
                    setIsEditContainer(true);
                  }}
                  className="bg-transparent w-fit p-0 m-0"
                >
                  <ButtonText>
                    <Icon as={Edit} />
                  </ButtonText>
                </Button>
                <Button
                  onPress={() => {
                    setSelectedRecipe(item);
                    setIsDeleteContainer(true);
                  }}
                  className="bg-transparent w-fit p-0 m-0"
                >
                  <ButtonText>
                    <Icon as={Trash} />
                  </ButtonText>
                </Button>
              </View>
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-1 items-center">
                  <SimpleLineIcons name="fire" size={16} color="gray" />
                  <Text className="text-[#97A2B0] text-[13px]">
                    {item.calories}
                  </Text>
                </View>
                <View className="flex flex-row gap-1 items-center">
                  <Icon className="text-[#97A2B0] w-4 h-4" as={Clock} />
                  <Text className="text-[#97A2B0] text-[13px]">
                    {item.timeTaken}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </AnimatedPressable>
    </FadeInView>
  );
};

export default SingleRecipeCard;
