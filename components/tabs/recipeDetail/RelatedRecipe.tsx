import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useGetRelatedRecipes } from "@/Query/recipe";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Platform, Pressable, View } from "react-native";

const RelatedRecipe = ({ id }: { id: string }) => {
  const router = useRouter();
  console.log(id, "in rer ");
  const { isLoading, data, error } = useGetRelatedRecipes(id);
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <View>
        <Text>Oops! an error occured</Text>
      </View>
    );
  }
  if (!data || !data.recipes) {
    return (
      <View>
        <Text>No related recipe there.</Text>
      </View>
    );
  }
  console.log(data, "related recipe data");

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
