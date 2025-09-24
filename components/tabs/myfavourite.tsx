import { useGetFavouriteList } from "@/hooks/query/recipe";

import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import FavouriteCard from "./FavouriteCard";

const Myfavourite = () => {
  const { data, isLoading, error } = useGetFavouriteList();
  const router = useRouter();
  if (isLoading) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Your Favorites
        </Text>
        <View className="flex-row justify-center py-8">
          <Spinner />
        </View>
      </View>
    );
  }

  if (error || !data?.success) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Your Favorites
        </Text>
        <View className="p-4 bg-red-50 rounded-lg border border-red-200">
          <View className="flex-row items-center">
            <Text className="text-red-700 flex-1">
              Unable to load your favorite recipes
            </Text>
            <Text className="text-red-500 text-sm ml-2">Retrying...</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!data.recipes?.length) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Your Favorites
        </Text>
        <View className="p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border-2 border-dashed border-pink-300">
          <View className="items-center">
            <Text className="text-5xl mb-3">💖</Text>
            <Text className="text-gray-800 text-lg font-semibold mb-2 text-center">
              No favorites yet
            </Text>
            <Text className="text-gray-600 text-center mb-4">
              Start building your collection of favorite recipes by tapping the
              heart icon on recipes you love
            </Text>
            <TouchableOpacity
              className="bg-pink-500 px-4 py-2 rounded-lg"
              onPress={() => router.push("/")}
            >
              <Text className="text-white font-medium">Discover Recipes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View className="mb-40">
      <View className="justify-between mb-4 items-center flex-row">
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className=" text-[22px] capitalize "
        >
          My favorites
        </Text>
      </View>
      <View>
        <FlatList
          data={data.recipes}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <FavouriteCard item={item} />}
        />
      </View>
    </View>
  );
};

export default Myfavourite;
