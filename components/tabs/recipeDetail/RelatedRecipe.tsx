import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useGetRelatedRecipes } from "@/hooks/query/recipe";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Platform, Pressable, View } from "react-native";

const RelatedRecipe = ({ id }: { id: string }) => {
  const router = useRouter();
  const { isLoading, data, error } = useGetRelatedRecipes(id);
  if (isLoading) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Related Recipes
        </Text>
        <View className="flex-row justify-center py-8">
          <Spinner />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Related Recipes
        </Text>
        <View className="p-4 bg-red-50 rounded-lg border border-red-200">
          <View className="flex-row items-center">
            <Text className="text-red-700 flex-1">
              Unable to load related recipes
            </Text>
            <Text className="text-red-500 text-sm ml-2">Retrying...</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!data || !data.recipes || data.recipes.length === 0) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Related Recipes
        </Text>
        <View className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <View className="items-center">
            <Text className="text-4xl mb-2">🍳</Text>
            <Text className="text-gray-600 text-center mb-1">
              No related recipes found
            </Text>
            <Text className="text-gray-500 text-sm text-center">
              Try exploring other recipes in our collection
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="pb-10 pt-6">
      <View className="flex justify-between flex-row items-center">
        <Text style={{ fontFamily: "PoppinsBold" }} className="text-[22px]">
          Related Recipe
        </Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 20 }}
        className=""
        data={data.recipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/recipe/${item._id}`)}>
            <View
              style={{
                // Enhanced iOS Shadow
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 5,

                // Enhanced Android Shadow
                elevation: Platform.OS === "android" ? 3 : 0,
              }}
              className="p-4 w-[130px]  h-auto bg-white dark:bg-[#121212] mr-7 flex flex-col gap-4 items-center rounded-[16px]"
            >
              <View className="flex flex-col w-full gap-4 h-[100px] ">
                <Image
                  className="w-full h-full rounded-2xl"
                  source={{ uri: item.imageUrl }}
                />
              </View>
              <View>
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="capitalize text-gray-600 dark:text-gray-300"
                  numberOfLines={1}
                >
                  {item.title}...
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default RelatedRecipe;
