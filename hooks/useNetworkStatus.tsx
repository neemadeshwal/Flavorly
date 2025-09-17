import { useEffect, useState } from "react";
import { subscribeToNetworkChanges } from "../utils/networkUtils";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToNetworkChanges((connected) => {
      setIsConnected(connected!);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected, isChecking };
};
