// app/(tabs)/_layout.tsx
import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { HeartIcon, HomeIcon, SearchIcon, UserIcon } from "lucide-react-native";
import { View } from "react-native";
const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => {
  return (
    <View className="p-4">
      <Icon
        as={icon}
        className={`w-8 h-8 ${
          focused ? "text-colored font-bold" : "text-[#97A2B0]"
        }`}
      />
    </View>
  );
};
export default function TabsLayout() {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // if (!isAuthenticated) {
  //   return <Redirect href="/(auth)" />;
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          height: 110,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HomeIcon} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={SearchIcon} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HeartIcon} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={UserIcon} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
