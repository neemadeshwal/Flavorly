import LandingScreen from "@/components/auth/LandingPage";
import { useAuthStore } from "@/stores/useUserStore";
import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return <LandingScreen />;
}
