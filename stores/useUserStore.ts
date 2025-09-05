import { auth } from "@/services/firebase/config";
import { AuthState } from "@/types";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase/auth";
import { create } from "zustand";

async function persistToSecureStore(state: Partial<AuthState>) {
  const { token, user, isAuthenticated } = state;

  try {
    const dataToStore = {
      token,
      isAuthenticated,
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
    console.log("💾 Auth state persisted to SecureStore");
  } catch (err) {
    console.error("❌ Failed to persist to SecureStore", err);
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  email: null,
  isLoading: true,
  isAuthenticated: false,

  // Set email for forms
  setEmail: (email: string) => {
    console.log("📧 Setting email:", email);
    set({ email });
  },

  // Set token and persist
  setToken: (token: string | null) => {
    console.log("🎫 Setting token:", !!token);
    const newState = { token };
    set(newState);
    persistToSecureStore({ ...get(), ...newState });
  },

  // Set user and update authentication state
  setUser: (user: User | null) => {
    console.log("👤 Setting user:", user ? user.email : "null");
    const isAuthenticated = !!user;
    const newState = {
      user,
      isAuthenticated,
      isLoading: false, // Stop loading when we have auth result
    };

    set(newState);
    persistToSecureStore({ ...get(), ...newState });

    console.log("✅ Auth state updated:", {
      isAuthenticated,
      email: user?.email,
    });
  },

  // Set loading state
  setLoading: (isLoading: boolean) => {
    console.log("⏳ Setting loading:", isLoading);
    set({ isLoading });
  },

  // Handle successful authentication (call this after Firebase auth succeeds)
  setAuthenticated: (user: User | null, token?: string) => {
    console.log("🎉 Setting authenticated user:", user ? user.email : "null");

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

    console.log("✅ Authentication complete:", {
      isAuthenticated,
      email: user?.email,
    });
  },

  // Logout and clear everything
  logout: async () => {
    console.log("🚪 Logging out...");
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

      console.log("✅ Logout complete");
    } catch (err) {
      console.error("❌ Logout error", err);
    }
  },

  // Initialize auth from SecureStore
  initializeAuth: async () => {
    console.log("🚀 Initializing auth from SecureStore...");
    set({ isLoading: true });

    try {
      const data = await SecureStore.getItemAsync("auth-storage");

      if (data) {
        const parsed = JSON.parse(data);
        console.log("📱 Found stored auth data:", {
          hasUser: !!parsed.user,
          isAuthenticated: !!parsed.isAuthenticated,
        });

        set({
          user: parsed.user,
          token: parsed.token,
          isAuthenticated: !!parsed.user && !!parsed.isAuthenticated,
          isLoading: false,
        });

        console.log("✅ Auth initialized from storage");
      } else {
        console.log("📭 No stored auth data found");
        set({
          isLoading: false,
          isAuthenticated: false,
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
    console.log("🧹 Clearing auth state...");
    try {
      await SecureStore.deleteItemAsync("auth-storage");
      set({
        user: null,
        token: null,
        email: null,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log("✅ Auth state cleared");
    } catch (err) {
      console.error("❌ Failed to clear auth state", err);
    }
  },
}));
