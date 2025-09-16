import {
  createNewRecipe,
  deleteRecipe,
  toggleLikeRecipe,
  updateRecipe,
} from "@/api/recipe";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { recipeData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAddRecipeMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  return useMutation({
    mutationFn: (data: recipeData) => createNewRecipe(data),
    onSuccess: () => {
      console.log("added recipe");
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

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: recipeData }) =>
      updateRecipe(id, data),
    onSuccess: () => {
      console.log("edited recipe");
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

  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      console.log("delete recipe");
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

  return useMutation({
    mutationFn: (id: string) => toggleLikeRecipe(id),
    onSuccess: () => {
      console.log("update recipe");
      // showSuccessToast({
      //   title: "recipe liked",
      //   message: "successfull",
      // });
    },
    onError: () => {
      // showErrorToast({
      //   title: "Error logging In",
      //   message: "An Error occured",
      //   retryAction: () => {},
      // });
    },
  });
};
