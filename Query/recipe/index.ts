import {
  getEditorChoiceRecipe,
  getFeaturedRecipe,
  getMyFavouriteRecipe,
  getPopularRecipe,
  getSingleRecipeDetail,
  myRecipes,
  relatedRecipes,
} from "@/api/recipe";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { useQuery } from "@tanstack/react-query";

export const useFeaturedRecipeList = () => {
  const category = useRecipeStore((state) => state.category);

  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-items", category],
    queryFn: getFeaturedRecipe,
  });
  return { isLoading, data, error };
};

export const usePopularRecipeList = () => {
  const category = useRecipeStore((state) => state.category);

  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-recipe-items", category],
    queryFn: getPopularRecipe,
  });
  return { isLoading, data, error };
};

export const useSingleRecipeDetails = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["single-recipe-detail", id],
    queryFn: () => getSingleRecipeDetail(id),
    enabled: !!id,
    retry: 2,
  });
  return { isLoading, data, error };
};

export const useEditorsChoiceList = (val?: string) => {
  const category = useRecipeStore((state) => state.category);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["editors-choice-items", category],
    queryFn: getEditorChoiceRecipe,
  });
  return { isLoading, data, error, refetch };
};

export const useGetFavouriteList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-favourite"],
    queryFn: getMyFavouriteRecipe,
  });
  return { isLoading, data, error };
};

export const useGetMyRecipes = (uid: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-recipes", uid],
    queryFn: () => myRecipes(uid),
  });
  return { isLoading, data, error };
};

export const useGetRelatedRecipes = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["related-recipes", id],
    queryFn: () => relatedRecipes(id),
  });
  return { isLoading, data, error };
};
