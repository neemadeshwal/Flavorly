import { auth } from "@/services/firebase/config";
import { AuthState } from "@/types";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase/auth";
import { create } from "zustand";

async function persistToSecureStore(state: Partial<AuthState>) {
  const { token, user, isAuthenticated, colorScheme } = state;

  try {
    const dataToStore = {
      token,
      isAuthenticated,
      colorScheme,
      user: user
        ? {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        : null,
    };

    await SecureStore.setItemAsync("auth-storage", JSON.stringify(dataToStore));
  } catch (err) {
    console.error("❌ Failed to persist to SecureStore", err);
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  email: null,
  isLoading: true,
  colorScheme: "light",
  isAuthenticated: false,
  userName: "",

  // Set email for forms
  setEmail: (email: string) => {
    set({ email });
  },
  setUserName: (name: string) => {
    set({ userName: name });
  },
  setColorScheme: (val: "light" | "dark") => {
    const newState = { colorScheme: val };
    set(newState);
    // ✅ Persist colorScheme changes
    persistToSecureStore({ ...get(), ...newState });
  },

  // Set token and persist
  setToken: (token: string | null) => {
    const newState = { token };
    set(newState);
    persistToSecureStore({ ...get(), ...newState });
  },

  // Set user and update authentication state
  setUser: (user: User | null) => {
    const isAuthenticated = !!user;
    const newState = {
      user,
      isAuthenticated,
      isLoading: false, // Stop loading when we have auth result
    };

    set(newState);
    persistToSecureStore({ ...get(), ...newState });
  },

  // Set loading state
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  // Handle successful authentication (call this after Firebase auth succeeds)
  setAuthenticated: (user: User | null, token?: string) => {
    const isAuthenticated = !!user;
    const newState = {
      user,
      token: token || get().token,
      isAuthenticated,
      isLoading: false,
      email: user?.email || null,
    };

    set(newState);
    persistToSecureStore(newState);
  },

  // Logout and clear everything
  logout: async () => {
    try {
      await auth.signOut();

      const clearedState = {
        user: null,
        token: null,
        email: null,
        isAuthenticated: false,
        isLoading: false,
      };

      set(clearedState);
      await SecureStore.deleteItemAsync("auth-storage");
    } catch (err) {
      console.error("❌ Logout error", err);
    }
  },

  // Initialize auth from SecureStore
  initializeAuth: async () => {
    set({ isLoading: true });

    try {
      const data = await SecureStore.getItemAsync("auth-storage");

      if (data) {
        const parsed = JSON.parse(data);

        const isAuthenticated = !!parsed.token && !!parsed.user;

        set({
          token: parsed.token,
          isAuthenticated: isAuthenticated,
          isLoading: parsed.isLoading,
          user: parsed.user,
        });
      } else {
        set({
          isLoading: false,
          isAuthenticated: false,
          token: null,
        });
      }
    } catch (err) {
      console.error("❌ SecureStore hydration failed", err);
      set({
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  // Clear auth state (for debugging)
  clearAuthState: async () => {
    try {
      await SecureStore.deleteItemAsync("auth-storage");
      set({
        user: null,
        token: null,
        email: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (err) {
      console.error("❌ Failed to clear auth state", err);
    }
  },
}));
