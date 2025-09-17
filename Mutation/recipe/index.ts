import {
  createNewRecipe,
  deleteRecipe,
  toggleLikeRecipe,
  updateRecipe,
} from "@/api/recipe";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { recipeData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRecipeMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  return useMutation({
    mutationFn: (data: recipeData) => createNewRecipe(data),
    onSuccess: () => {
      showSuccessToast({
        title: "New recipe added",
        message: "successfull",
      });
    },
    onError: () => {
      showErrorToast({
        title: "Error logging In",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};
export const useUpdateRecipeMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: recipeData }) =>
      updateRecipe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-recipes"] });

      showSuccessToast({
        title: "recipe updated ",
        message: "successfull",
      });
    },
    onError: () => {
      showErrorToast({
        title: "Error logging In",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};

export const useDeleteRecipeMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      console.log("delete recipe");
      queryClient.invalidateQueries({ queryKey: ["my-recipes"] });

      showSuccessToast({
        title: "delete recipe ",
        message: "successfull",
      });
    },
    onError: () => {
      showErrorToast({
        title: "Error occurd",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};

export const useLikeRecipeMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
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
        showSuccessToast({
          title: "recipe liked",
          message: "successfull",
        });
      }
    },
    onError: () => {
      showErrorToast({
        title: "Error logging In",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};
