import SinglePopularRecipe from "@/components/Cards/SinglePopularRecipe";
import { Text } from "@/components/ui/text";
import { usePopularRecipeList } from "@/Query/recipe";
import React from "react";
import { FlatList, View } from "react-native";
import { Spinner } from "../../ui/spinner";

const PopularRecipes = () => {
  const { data, isLoading, error } = usePopularRecipeList();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data?.success) {
    return (
      <View>
        <Text> Oops! an error occured.</Text>
      </View>
    );
  }

  if (!data.recipes?.length) {
    return (
      <View>
        <Text className="text-gray-500 text-[18px]">
          No popular recipes. Try adding one.
        </Text>
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
