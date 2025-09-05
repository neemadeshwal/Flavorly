import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Text as RNText, useColorScheme } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { auth } from "@/services/firebase/config";
import { useAuthStore } from "@/stores/useUserStore";
import { onAuthStateChanged } from "firebase/auth";
import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
  });

  const didOverrideRef = useRef(false);
  const router = useRouter();

  const path = usePathname();
  console.log("pathh ", path);
  // Get auth state from store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Initialize Facebook SDK once
  useEffect(() => {
    Settings.initializeSDK();
    console.log("✅ Facebook SDK initialized");
  }, []);

  // Override default font globally
  useEffect(() => {
    if (fontsLoaded && !didOverrideRef.current) {
      (RNText as any).defaultProps = {
        ...(RNText as any).defaultProps,
        style: [{ fontFamily: "Poppins" }, (RNText as any).defaultProps?.style],
      };
      didOverrideRef.current = true;
    }
  }, [fontsLoaded]);

  // Initialize auth from SecureStore
  useEffect(() => {
    console.log("🚀 Initializing auth store...");
    useAuthStore.getState().initializeAuth();
  }, []);

  // Listen to Firebase auth state changes and sync with Zustand store
  useEffect(() => {
    console.log("👂 Setting up Firebase auth listener...");

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔥 Firebase auth state changed:", {
        hasUser: !!firebaseUser,
        email: firebaseUser?.email,
        uid: firebaseUser?.uid,
      });

      // Update Zustand store with Firebase auth state
      useAuthStore.getState().setUser(firebaseUser);

      if (firebaseUser) {
        console.log("✅ User is authenticated - Firebase user found");
      } else {
        console.log("❌ User is not authenticated - No Firebase user");
      }
    });

    return () => {
      console.log("🧹 Cleaning up Firebase auth listener");
      unsubscribe();
    };
  }, []);

  // Debug auth state changes
  useEffect(() => {
    console.log("🔍 AUTH STATE UPDATE:", {
      isAuthenticated,
      isLoading,
      timestamp: new Date().toISOString(),
    });
  }, [isAuthenticated, isLoading]);

  // Show loading while fonts load or auth initializes
  if (!fontsLoaded || isLoading) {
    console.log("⏳ Loading...", { fontsLoaded, isLoading });
    return null; // You can replace with a loading component
  }

  console.log("🎯 RENDERING LAYOUT:", { isAuthenticated });

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>{}</Stack>
          </ThemeProvider>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
