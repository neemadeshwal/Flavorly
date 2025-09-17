import NetInfo from "@react-native-community/netinfo";

export const checkInternetConnectivity = async (): Promise<boolean | null> => {
  try {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected && netInfoState.isInternetReachable;
  } catch (error) {
    console.log("Error checking connectivity:", error);
    return false;
  }
};

export const subscribeToNetworkChanges = (
  callback: (isConnected: boolean | null) => void
) => {
  return NetInfo.addEventListener((state) => {
    const isConnected = state.isConnected && state.isInternetReachable;
    callback(isConnected);
  });
};
