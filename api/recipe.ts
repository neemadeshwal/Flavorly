import { useRecipeStore } from "@/stores/useRecipeStore";
import { recipeData } from "@/types";
import instance from "./axios";

export const createNewRecipe = async (recipeData: recipeData) => {
  try {
    console.log(recipeData, "recipetdata");
    const response = await instance.post("/recipe/new", recipeData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRecipe = async (id: string, updatedData: recipeData) => {
  try {
    const response = await instance.patch(`/recipe/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const response = await instance.delete(`/recipe/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getFeaturedRecipe = async () => {
  const category = useRecipeStore.getState().category;

  try {
    let response;
    if (category !== "all") {
      response = await instance.get(
        `/recipe?isFeatured=true&category=${category.toLowerCase()}`
      );
    } else {
      response = await instance.get(`/recipe?isFeatured=true`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPopularRecipe = async () => {
  const category = useRecipeStore.getState().category;

  try {
    let response;
    console.log(category !== "all", "boolean check");

    if (category !== "all") {
      console.log("hey");
      response = await instance.get(
        `/recipe?isPopularRecipe=true&category=${category.toLowerCase()}`
      );
    } else {
      response = await instance.get(`/recipe?isPopularRecipe=true`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleRecipeDetail = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Recipe ID is required");
    }
    const response = await instance.get(`/recipe/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleLikeRecipe = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Recipe id is required.");
    }
    const response = await instance.patch(
      `/recipe/toggleRecipeFavourite/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEditorChoiceRecipe = async () => {
  const category = useRecipeStore.getState().category;

  try {
    let response;
    if (category !== "all") {
      response = await instance.get(
        `/recipe?isEditorsChoice=true&category=${category.toLowerCase()}`
      );
    } else {
      response = await instance.get(`/recipe?isEditorsChoice=true`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getMyFavouriteRecipe = async () => {
  try {
    const response = await instance.get(`/recipe/myrecipe/myFavouriteRecipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const myRecipes = async (uid: string) => {
  try {
    const response = await instance.get(`/recipe/myRecipe/${uid}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const relatedRecipes = async (id: string) => {
  console.log(id, "in api");
  try {
    const response = await instance.get(`/recipe/relatedRecipe/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
