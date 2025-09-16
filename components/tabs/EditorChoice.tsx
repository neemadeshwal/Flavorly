import { recipe } from "@/types";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { FlatList, Image, View } from "react-native";
import AnimatedPressable from "../animation";
import FadeInView from "../animation/FadeIn";
import { Icon } from "../ui/icon";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";

const EditorChoice = ({
  data,
  isLoading,
  error,
}: {
  data: { recipes: recipe[]; success: boolean };
  isLoading: boolean;
  error: Error | null;
}) => {
  const router = useRouter();
  console.log(data.recipes, "data in editors");

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
      </View>
    );
  }

  if (error || !data?.success) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-[16px]">
          Oops! An error occurred.
        </Text>
      </View>
    );
  }

  if (!data.recipes?.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-[18px] text-center">
          No editors choice recipes. Try adding one.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View className="justify-between mb-4 items-center flex-row">
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className="text-[22px] capitalize"
        >
          Editor's choice
        </Text>
      </View>

      <FlatList
        data={data.recipes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <FadeInView
            delay={100}
            index={index}
            staggerDelay={150}
            key={item._id}
          >
            <AnimatedPressable
              scaleTo={1.05}
              onPress={() => router.push(`/recipe/${item._id}`)}
            >
              <View className="bg-white dark:bg-[#202225] shadow-2xl mb-6 flex p-4 rounded-[15px] flex-row gap-3 w-full h-auto">
                {/* Recipe Image */}
                <View className="flex items-center justify-center w-[120px] h-[100px]">
                  <Image
                    className="w-full rounded-[20px] h-full"
                    source={{ uri: item.imageUrl }}
                    resizeMode="cover"
                  />
                </View>

                {/* Recipe Content */}
                <View className="flex-1 justify-center pr-4">
                  <Text
                    style={{ fontFamily: "PoppinsSemiBold" }}
                    className="text-[16px] flex-wrap"
                    numberOfLines={3}
                  >
                    {item.title}
                  </Text>
                  {/* Optional: Add more recipe details */}
                  {item.description && (
                    <Text
                      className="text-gray-600 dark:text-gray-400 text-[14px] mt-2"
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                  )}
                </View>

                {/* Arrow Icon */}
                <View className="flex justify-center items-center">
                  <View className="bg-button p-2 rounded-full">
                    <Icon as={ArrowRight} className="text-white w-6 h-6" />
                  </View>
                </View>
              </View>
            </AnimatedPressable>
          </FadeInView>
        )}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        initialNumToRender={8}
        windowSize={10}
      />
    </View>
  );
};

export default EditorChoice;
