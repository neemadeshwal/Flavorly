import { loginSchema, signupSchema } from "@/schema";
import { User } from "firebase/auth";
import { z } from "zod";
export type loginFormType = z.infer<typeof loginSchema>;

export type signFormType = z.infer<typeof signupSchema>;

export interface signupFormProps {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  phone?: string;
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
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initializeAuth: () => void;
  setEmail: (email: string) => void;
}
