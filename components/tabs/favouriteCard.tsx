import { useLikeRecipeMutation } from "@/Mutation/recipe";
import { useAuthStore } from "@/stores/useUserStore";
import { recipe, UserData } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { Clock, Dot } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";

const FavouriteCard = ({ item }: { item: recipe }) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  const { favouriteArray, _id } = item;
  const user = useAuthStore.getState().user;

  const favouriteMutation = useLikeRecipeMutation();
  useEffect(() => {
    if (user && favouriteArray && favouriteArray.length) {
      const isUserFav = favouriteArray.some(
        (fav: UserData) => fav.uid === user.uid
      );
      setIsLiked(!!isUserFav);
    }
  }, [user, favouriteArray]);

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    try {
      const response = await favouriteMutation.mutateAsync(_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => router.push(`/recipe/${item._id}`)}
        className="mb-10"
      >
        <View className="p-4 flex flex-col gap-3  bg-white dark:bg-[#202225] rounded-[25px] w-full h-auto">
          <View className="rounded-[20px] flex items-center justify-center w-full h-[160px] ">
            <Image
              className="w-full rounded-[20px] h-full"
              source={{ uri: item.imageUrl }}
            />
            <Button
              onPress={handleLike}
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
            <Text
              numberOfLines={1}
              style={{ fontFamily: "PoppinsBold" }}
              className="text-[22px]"
            >
              {item.title}
            </Text>
          </View>
          <View className="flex flex-row  justify-between items-center w-[50%]">
            <View className="flex flex-row gap-2 items-center">
              <SimpleLineIcons name="fire" size={24} color="gray" />
              <Text className="text-[#97A2B0]  text-[16px]">
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
          <View className="  gap-2 flex flex-row items-center ">
            {item.createdBy.photoUrl ? (
              <Image
                source={{
                  uri: item.createdBy.photoUrl,
                }}
                resizeMode="cover"
                className="w-8 h-8 border border-white rounded-full "
              />
            ) : (
              <View className="flex items-center justify-center bg-button pt-2  w-12 h-12 rounded-full border ">
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-white text-[17px]  text-center  w-full h-full uppercase rounded-full"
                >
                  {item.createdBy.firstname.slice(0, 1)}
                  {item.createdBy.lastname &&
                    item.createdBy.lastname.slice(0, 1)}
                </Text>
              </View>
            )}

            <Text
              style={{ fontFamily: "PoppinsSemiBold" }}
              className="text-gray-700 dark:text-gray-400 capitalize text-[18px]"
            >
              {item.createdBy.firstname} {item.createdBy.lastname}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FavouriteCard;
