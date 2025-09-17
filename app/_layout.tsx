import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { StatusBar, Text, useColorScheme, View } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/services/firebase/config";
import { useAuthStore } from "@/stores/useUserStore";
import { onAuthStateChanged } from "firebase/auth";
import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import setDefaultProps from "react-native-simple-default-props";

const queryClient = new QueryClient();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsXBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const path = usePathname();

  // Get auth state from store with proper subscription
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const colorScheme = useAuthStore((state) => state.colorScheme); // ✅ Subscribe to color scheme

  // Initialize Facebook SDK once
  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  // Override default font globally
  useEffect(() => {
    if (fontsLoaded) {
      setDefaultProps(Text, {
        style: {
          fontFamily: "Poppins",
        },
      });
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
    });

    return () => {
      console.log("🧹 Cleaning up Firebase auth listener");
      unsubscribe();
    };
  }, []);

  // ✅ Apply color scheme changes to StatusBar and system UI
  useEffect(() => {
    console.log("🎨 Applying color scheme:", colorScheme);

    // Update StatusBar
    StatusBar.setBarStyle(
      colorScheme === "dark" ? "light-content" : "dark-content",
      true
    );

    // Set StatusBar background color
    StatusBar.setBackgroundColor(
      colorScheme === "dark" ? "#1a1a1a" : "#ffffff",
      true
    );
  }, [colorScheme]);

  // Debug auth state changes
  useEffect(() => {
    console.log("🔍 AUTH STATE UPDATE:", {
      isAuthenticated,
      isLoading,
      colorScheme,
      timestamp: new Date().toISOString(),
    });
  }, [isAuthenticated, isLoading, colorScheme]);

  // Show loading while fonts load or auth initializes
  if (!fontsLoaded || isLoading) {
    console.log("⏳ Loading...", { fontsLoaded, isLoading });
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#181818" : "#ffffff",
        }}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colorScheme === "dark" ? "#1a1a1a" : "#ffffff"}
        />
        <Spinner />
      </View>
    );
  }

  console.log("🎯 RENDERING LAYOUT:", { isAuthenticated, colorScheme });

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorScheme}>
        <SafeAreaProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar
              barStyle={
                colorScheme === "dark" ? "light-content" : "dark-content"
              }
              backgroundColor={colorScheme === "dark" ? "#1a1a1a" : "#ffffff"}
            />
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
