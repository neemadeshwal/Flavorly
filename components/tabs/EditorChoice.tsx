import { recipe } from "@/types";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import AnimatedPressable from "../animation";
import FadeInView from "../animation/fadeIn";
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <View className="items-center">
          <Spinner size="large" />
          <Text className="mt-4 text-gray-600 text-lg">
            Loading editor's choice...
          </Text>
        </View>
      </View>
    );
  }

  if (error || !data?.success) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-gray-50">
        <View className="items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
          <Text className="text-5xl mb-4">⚠️</Text>
          <Text className="text-gray-800 text-lg font-semibold mb-2 text-center">
            Something went wrong
          </Text>
          <Text className="text-gray-600 text-center mb-4">
            {error?.message ||
              "Unable to load editor's choice recipes. Please try again."}
          </Text>
          <TouchableOpacity
            className="bg-card px-6 py-3 rounded-lg"
            onPress={() => window.location.reload()}
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!data.recipes?.length) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-gray-50">
        <View className="items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
          <Text className="text-6xl mb-4">👨‍🍳</Text>
          <Text className="text-gray-800 text-xl font-semibold mb-2 text-center">
            No Editor's Choice Yet
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Be the first to add a recipe to our curated collection of
            exceptional dishes.
          </Text>
        </View>
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
        contentContainerStyle={{
          paddingBottom: 20, // Add bottom padding for safe area
        }}
        renderItem={({ item, index }) => (
          <FadeInView
            delay={100}
            index={index}
            staggerDelay={150}
            key={item._id}
            style={{ backgroundColor: "" }}
          >
            <AnimatedPressable
              scaleTo={1.05}
              className="bg-white"
              onPress={() => router.push(`/recipe/${item._id}`)}
            >
              <View className="bg-white shadow-xl dark:bg-[#202225] mb-6 flex p-4 rounded-[15px] flex-row gap-3 w-full">
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
