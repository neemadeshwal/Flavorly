import MyRecipes from "@/components/tabs/MyRecipes";
import Account from "@/components/tabs/profile/Account";
import { Spinner } from "@/components/ui/spinner";
import { useGetUserDetails } from "@/Query/auth";
import { useAuthStore } from "@/stores/useUserStore";
import React from "react";
import { Text, View } from "react-native";

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
    <View className="px-4 py-20  pb-30  pt-20 flex flex-col gap-[24px]">
      <Account account={data.data} />
      <MyRecipes />
    </View>
  );
};

export default Profile;
