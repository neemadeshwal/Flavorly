// components/NoInternetScreen.tsx - Enhanced version
import { RefreshCw, Smartphone, Wifi, WifiOff } from "lucide-react-native";
import React from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import { Text } from "./ui/text";

interface NoInternetScreenProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

const NoInternetScreen: React.FC<NoInternetScreenProps> = ({
  onRetry,
  isRetrying = false,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 justify-center items-center px-8">
        <View className="items-center w-full max-w-sm">
          {/* Animated Icon Container */}
          <View className="relative mb-8">
            <View className="w-28 h-28 bg-red-50 dark:bg-red-900/20 rounded-full justify-center items-center">
              <WifiOff size={56} color="#EF4444" />
            </View>

            {/* Pulse animation indicator */}
            <View className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full justify-center items-center">
              <Text className="text-white text-xs font-bold">!</Text>
            </View>
          </View>

          {/* Main Title */}
          <Text
            className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4"
            style={{ fontFamily: "PoppinsBold" }}
          >
            Oops! No Internet
          </Text>

          {/* Description */}
          <Text className="text-gray-600 dark:text-gray-400 text-center text-lg leading-7 mb-8">
            It seems like you're not connected to the internet. Check your
            connection and try again.
          </Text>

          {/* Connection Tips */}
          <View className="w-full mb-10 space-y-4">
            <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <Wifi size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300 flex-1">
                Check your Wi-Fi connection
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <Smartphone size={24} color="#6B7280" />
              <Text className="ml-3 text-gray-700 dark:text-gray-300 flex-1">
                Try mobile data instead
              </Text>
            </View>
          </View>

          {/* Retry Button */}
          <TouchableOpacity
            onPress={onRetry}
            disabled={isRetrying}
            className={`w-full bg-card dark:bg-button py-4 px-6 rounded-2xl flex-row justify-center items-center ${
              isRetrying ? "opacity-50" : ""
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <RefreshCw
              size={20}
              color="white"
              style={{
                transform: [{ rotate: isRetrying ? "360deg" : "0deg" }],
              }}
            />
            <Text className="text-white font-bold text-lg ml-3">
              {isRetrying ? "Checking Connection..." : "Try Again"}
            </Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text className="text-gray-500 dark:text-gray-500 text-center text-sm mt-6">
            Make sure you have an active internet connection
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoInternetScreen;
