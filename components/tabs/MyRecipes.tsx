import { useDeleteRecipeMutation } from "@/hooks/mutation/recipe";
import { useGetMyRecipes } from "@/hooks/query/recipe";
import { useAuthStore } from "@/stores/useUserStore";
import { recipe } from "@/types";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Modal, View } from "react-native";
import SingleRecipeCard from "../Cards/SingleMyRecipe";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import AddRecipe from "./AddRecipe";

const MyRecipes = () => {
  const user = useAuthStore.getState().user;
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | null>(null); // Track selected recipe
  const [isDeleteContainer, setIsDeleteContainer] = useState(false);
  const deleteRecipeMutation = useDeleteRecipeMutation();
  const [isEditContainer, setIsEditContainer] = useState(false);

  const handleDeleteRecipe = async () => {
    if (!selectedRecipe) return;
    try {
      const response = deleteRecipeMutation.mutateAsync(selectedRecipe._id);
      setIsDeleteContainer(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <View className="items-center">
          <Spinner size="large" />
          <Text className="mt-4 text-gray-600 text-lg">
            Loading your profile...
          </Text>
        </View>
      </View>
    );
  }

  const { data, isLoading, error } = useGetMyRecipes(user.uid);

  if (isLoading) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">My Recipes</Text>
        <View className="flex-row justify-center py-8">
          <Spinner />
          <Text className="ml-3 text-gray-600">Loading your recipes...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">My Recipes</Text>
        <View className="p-4 bg-red-50 rounded-lg border border-red-200">
          <View className="flex-row items-center">
            <Text className="text-red-700 flex-1">
              Unable to load your recipes
            </Text>
            <Text className="text-red-500 text-sm ml-2">Retrying...</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!data?.data?.length) {
    return (
      <View className="py-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">My Recipes</Text>
        <View className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300">
          <View className="items-center">
            <Text className="text-6xl mb-4">📝</Text>
            <Text className="text-gray-800 text-xl font-semibold mb-2 text-center">
              Start Your Recipe Collection
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Share your culinary creations with the world! Create your first
              recipe and build your personal cookbook.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="px-4 flex-1">
      <Text
        style={{ fontFamily: "PoppinsSemiBold" }}
        className="text-[22px] capitalize mb-6"
      >
        My Recipes
      </Text>
      <FlatList
        keyExtractor={(item) => item._id}
        data={data.data}
        renderItem={({ item }) => (
          <SingleRecipeCard
            item={item}
            setSelectedRecipe={setSelectedRecipe}
            setIsDeleteContainer={setIsDeleteContainer}
            setIsEditContainer={setIsEditContainer}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteContainer && selectedRecipe && (
        <Modal
          visible={isDeleteContainer}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setIsDeleteContainer(false);
            setSelectedRecipe(null);
          }}
        >
          <View className="flex h-full bg-black/50 dark:bg-black/80 items-center justify-center px-6">
            <View className="bg-white dark:bg-[#1a1919] p-6 rounded-[20px] flex flex-col gap-6 w-full max-w-sm">
              <Heading className="text-[20px] text-center">
                Are you sure you want to delete ?
              </Heading>
              <View className="flex flex-row justify-between gap-4">
                <Button
                  onPress={() => {
                    setIsDeleteContainer(false);
                    setSelectedRecipe(null);
                  }}
                  className="bg-white rounded-[10px] border border-[#0A2533] flex-1 h-[50px]"
                >
                  <ButtonText className="text-black text-[18px]">
                    Cancel
                  </ButtonText>
                </Button>
                <Button
                  onPress={handleDeleteRecipe}
                  className="bg-red-500 dark:bg-red-600 rounded-[10px] flex-1 h-[50px]"
                  disabled={deleteRecipeMutation.isPending}
                >
                  {deleteRecipeMutation.isPending ? (
                    <ActivityIndicator size={18} color="white" />
                  ) : (
                    <ButtonText className="text-[18px] text-white">
                      Delete
                    </ButtonText>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Edit Recipe Modal */}
      {isEditContainer && selectedRecipe && (
        <AddRecipe
          isEdit={true}
          setCloseDialog={setIsEditContainer}
          editData={selectedRecipe} // Pass single recipe instead of array
        />
      )}
    </View>
  );
};

export default MyRecipes;
