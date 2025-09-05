import Featured from "@/components/tabs/featured";
import GreetComponent from "@/components/tabs/greetComponent";
import { Button, ButtonText } from "@/components/ui/button";
import * as SecureStorage from "expo-secure-store";
import React from "react";
import { View } from "react-native";
const Home = () => {
  async function checkSecureStore() {
    const token = await SecureStorage.getItemAsync("auth-storage");
    console.log(token, "secure data here");
  }
  return (
    <View className="px-6 py-20 flex flex-col gap-[24px]">
      <GreetComponent />
      <Featured />
      <Button onPress={checkSecureStore}>
        <ButtonText>check token</ButtonText>
      </Button>
    </View>
  );
};

export default Home;
