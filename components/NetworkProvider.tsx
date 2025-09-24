import NoInternetScreen from "@/components/NoInternetScreen";
import { useNetworkStatus } from "@/hooks/customHooks/useNetworkStatus";
import { checkInternetConnectivity } from "@/utils/networkUtils";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Spinner } from "./ui/spinner";

interface NetworkProviderProps {
  children: React.ReactNode;
}

const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const { isConnected, isChecking } = useNetworkStatus();
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasInitialConnection, setHasInitialConnection] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    // Check initial connection status
    const checkInitialConnection = async () => {
      const connected = await checkInternetConnectivity();
      setHasInitialConnection(connected);
    };

    if (hasInitialConnection === null && !isChecking) {
      checkInitialConnection();
    }
  }, [isChecking, hasInitialConnection]);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      // Wait a bit before checking connectivity
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const connected = await checkInternetConnectivity();
      if (connected) {
        setHasInitialConnection(true);
      }
    } finally {
      setIsRetrying(false);
    }
  };

  // Show loading while checking initial connection
  if (isChecking && hasInitialConnection === null) {
    return (
      <View className="flex-1 bg-white dark:bg-gray-900 justify-center items-center">
        <Spinner />
      </View>
    );
  }

  // Show no internet screen if disconnected
  if (!isConnected && hasInitialConnection !== null) {
    return <NoInternetScreen onRetry={handleRetry} isRetrying={isRetrying} />;
  }

  // Show app content when connected
  return <>{children}</>;
};

export default NetworkProvider;
