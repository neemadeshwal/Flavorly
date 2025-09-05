import * as SecureStorage from "expo-secure-store";

export const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStorage.getItemAsync(name);
    } catch (error) {
      console.error("Secure store get error", error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const response = await SecureStorage.setItemAsync(name, value, {
        keychainService: process.env.EXPO_PUBLIC_BUNDLE_ID,
        keychainAccessible: SecureStorage.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      console.log(response);
    } catch (error) {
      console.error("SecureStore set error: ", error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStorage.deleteItemAsync(name);
    } catch (error) {
      console.error("secure storage remove error: ", error);
    }
  },
};
