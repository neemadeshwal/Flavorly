import { RecipeState } from "@/types";
import { create } from "zustand";

export const useRecipeStore = create<RecipeState>((set, get) => ({
  category: "all",
  setCategory: (category: string) => set({ category }),
}));
