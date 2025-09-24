import SinglePopularRecipe from "@/components/Cards/SinglePopularRecipe";
import { Text } from "@/components/ui/text";
import { usePopularRecipeList } from "@/hooks/query/recipe";
import React from "react";
import { FlatList, View } from "react-native";
import { Spinner } from "../../ui/spinner";

const PopularRecipes = () => {
  const { data, isLoading, error } = usePopularRecipeList();

  if (isLoading && !data) {
    return <Spinner />;
  }

  if (error || !data.success) {
    return (
      <View className="py-2">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Popular Recipes
        </Text>
        <View className="flex-row items-center">
          <Text className="text-gray-500">Unable to load</Text>
          <Text className="mx-2 text-gray-400">•</Text>
          <Text className="text-colored">Retrying...</Text>
        </View>
      </View>
    );
  }
  if (!data.recipes.length) {
    return (
      <View className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <View className="items-center">
          <Text className="text-2xl mb-2">👨‍🍳</Text>
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            No Popular Recipes Yet
          </Text>
          <Text className="text-gray-500 text-center mb-4">
            Ready to showcase some delicious recipes? Add your first popular
            recipe to get started.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-14">
      <View className="justify-between mb-4 items-center flex-row">
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className=" text-[22px] capitalize "
        >
          popular recipes
        </Text>
      </View>
      <View>
        <FlatList
          horizontal
          data={data.recipes}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <SinglePopularRecipe item={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default PopularRecipes;
