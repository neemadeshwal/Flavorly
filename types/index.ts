import {
  loginSchema,
  recipeSchema,
  signupSchema,
  userDetailSchema,
} from "@/schema";
import { User } from "firebase/auth";
import { z } from "zod";
export type loginFormType = z.infer<typeof loginSchema>;

export type signFormType = z.infer<typeof signupSchema>;

export type recipeFormType = z.infer<typeof recipeSchema>;

export type userDetailFormType = z.infer<typeof userDetailSchema>;
export interface signupFormProps {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UserData extends signupFormProps {
  uid: string;
  bio?: string;
  photoUrl?: string;
  phoneNumber?: string;
}
export interface loginFormProps {
  email: string;
  password: string;
}

export interface emailFormProps {
  email: string;
}
export interface AuthState {
  user: User | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userName: string;
  colorScheme: "light" | "dark";
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initializeAuth: () => void;
  setEmail: (email: string) => void;
  setUserName: (name: string) => void;
  setColorScheme: (val: "light" | "dark") => void;
}
export interface RecipeState {
  category: string;
  setCategory: (category: string) => void;
}

export interface instruction {
  stepNumber: number;
  title: string;
  text: string;
}

export interface ingredient {
  name: string;
  quantity: number;
  unit: string;
}
export interface recipeData {
  title: string;
  description: string;
  ingredients: ingredient[];
  instructions: instruction[];
  imageUrl: string;
  cuisineType: string;
  category: string;
  timeTaken: string;
  calories: string;
  protein: string;
  fats: string;
  carbs: string;
  isFeatured: boolean;
  isEditorsChoice: boolean;
  favouriteArray: [];
  isPopularRecipe: boolean;
  isVeg: boolean;
}
export interface recipe extends recipeData {
  _id: string;
  createdBy: UserData;
}
