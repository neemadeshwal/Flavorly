import MyRecipes from "@/components/tabs/MyRecipes";
import Account from "@/components/tabs/profile/Account";
import { Spinner } from "@/components/ui/spinner";
import { useGetUserDetails } from "@/hooks/query/auth";
import { useAuthStore } from "@/stores/useUserStore";
import React from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

const Profile = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Spinner />;
  }

  const { data, isLoading, error } = useGetUserDetails(user.uid);
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    <View>
      <Text>Oops! an error occured</Text>
    </View>;
  }
  if (!data) {
    return (
      <View>
        <Text>no data</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      className="px-4 py-20  pb-5  pt-20 flex flex-col gap-[24px]"
    >
      <Account account={data.data} />
      <MyRecipes />
    </KeyboardAvoidingView>
  );
};

export default Profile;
