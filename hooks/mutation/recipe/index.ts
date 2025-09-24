import {
  createNewRecipe,
  deleteRecipe,
  toggleLikeRecipe,
  updateRecipe,
} from "@/api/recipe";
import useCustomToast from "@/hooks/customHooks/useCustomToast";
import { recipeData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRecipeMutation = () => {
  const { showCustomToast } = useCustomToast();

  return useMutation({
    mutationFn: (data: recipeData) => createNewRecipe(data),
    onSuccess: () => {
      showCustomToast({
        title: "New recipe added",
        message: "successfull",
        isError: false,
      });
    },
    onError: () => {
      showCustomToast({
        title: "Error logging In",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};
export const useUpdateRecipeMutation = () => {
  const { showCustomToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: recipeData }) =>
      updateRecipe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-recipes"] });

      showCustomToast({
        title: "recipe updated ",
        message: "successfull",
        isError: false,
      });
    },
    onError: () => {
      showCustomToast({
        title: "Error logging In",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};

export const useDeleteRecipeMutation = () => {
  const { showCustomToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-recipes"] });

      showCustomToast({
        title: "delete recipe ",
        message: "successfull",
        isError: false,
      });
    },
    onError: () => {
      showCustomToast({
        title: "Error occurd",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};

export const useLikeRecipeMutation = () => {
  const { showCustomToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleLikeRecipe(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-favourite"] });

      // Optionally, also invalidate other related queries
      queryClient.invalidateQueries({ queryKey: ["featured-items"] });
      queryClient.invalidateQueries({ queryKey: ["popular-recipe-items"] });
      queryClient.invalidateQueries({ queryKey: ["editors-choice-items"] });
      queryClient.invalidateQueries({ queryKey: ["single-recipe-detail"] });
      queryClient.invalidateQueries({ queryKey: ["my-recipes"] });

      if (data && data.isFavorited) {
        showCustomToast({
          title: "recipe liked",
          message: "successfull",
          isError: false,
        });
      }
    },
    onError: () => {
      showCustomToast({
        title: "Error logging In",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};
