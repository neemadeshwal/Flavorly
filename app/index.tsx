import LandingScreen from "@/components/auth/LandingPage";
import { useAuthStore } from "@/stores/useUserStore";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect href="/(tabs)" />;
  // }
  return <LandingScreen />;
}
