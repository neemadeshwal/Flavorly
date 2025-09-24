import ProfileDetails from "@/components/tabs/profile/ProfileDetails";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useGetUserDetails } from "@/hooks/query/auth";
import { useAuthStore } from "@/stores/useUserStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, LogOut, MoonIcon, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

const UserDetails = () => {
  const { id } = useLocalSearchParams();

  const uid = typeof id === "string" ? id : id[0];

  const { isLoading, data, error } = useGetUserDetails(uid);

  const [profileDetails, setProfileDetails] = useState(false);
  const [isLogoutContainerOpen, setIsLogoutContainerOpen] = useState(false);
  const router = useRouter();

  // ✅ Properly subscribe to store changes
  const currentColorScheme = useAuthStore((state) => state.colorScheme);
  const setColorScheme = useAuthStore((state) => state.setColorScheme);
  const logout = useAuthStore((state) => state.logout);

  // ✅ Toggle dark mode function
  const toggleDarkMode = (value: boolean) => {
    const newScheme = value ? "dark" : "light";
    setColorScheme(newScheme);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    setIsLogoutContainerOpen(false);

    router.push("/(auth)");
  };

  const isDarkMode = currentColorScheme === "dark";

  if (isLoading) {
    return <Spinner />;
  }
  if (error || !data) {
    return (
      <View>
        <Text>Oops! An error occured.</Text>
      </View>
    );
  }
  const { firstname, lastname, email, photoUrl } = data.data;
  return (
    <KeyboardAvoidingView className="flex-1 overflow-auto">
      <View className="py-20 pb-10 flex-1 pt-16  flex-col gap-[24px]">
        <TouchableOpacity onPress={() => router.back()} className="mt-6 px-2">
          <Icon as={ArrowLeft} className="w-8 h-8" />
        </TouchableOpacity>

        {/* Header Background */}
        <View className="bg-card dark:bg-button h-[140px]"></View>

        {/* Profile Section */}
        <View>
          {/* Profile Avatar and Name */}
          <View className="absolute flex flex-col items-center -top-28 justify-center w-full h-auto">
            <View>
              {photoUrl ? (
                <Image
                  source={{
                    uri: photoUrl,
                  }}
                  resizeMode="cover"
                  className="w-36 h-36 border-2 border-white rounded-full"
                />
              ) : (
                <View className="flex items-center justify-center bg-button w-36 h-36 rounded-full border-2 border-white">
                  <Text
                    style={{ fontFamily: "PoppinsBold" }}
                    className="text-white text-[44px] text-center w-full uppercase rounded-full"
                  >
                    {firstname.charAt(0)}
                    {lastname && lastname.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{ fontFamily: "PoppinsSemiBold" }}
              className="text-[24px] capitalize text-center mt-4"
            >
              {firstname} {lastname}
            </Text>
          </View>

          {/* User Details and Settings */}
          <View className="mt-28">
            {/* Email Section */}
            <View className="px-4 flex-row justify-between mb-6">
              <Text className="text-[20px] text-typography-600">Mail</Text>
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className="text-[20px]"
              >
                {email}
              </Text>
            </View>

            <View className="my-6">
              {/* Dark Mode Toggle */}
              <View className="w-full h-px bg-gray-300"></View>
              <View className="px-4 py-6 flex justify-between items-center flex-row">
                <View className="flex gap-4 items-center flex-row">
                  <Icon className="w-7 h-7" as={MoonIcon} />
                  <Text
                    style={{ fontFamily: "PoppinsSemiBold" }}
                    className="text-[18px]"
                  >
                    Dark mode
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  size="md"
                  trackColor={{ false: "#d4d4d4", true: "#525252" }}
                  thumbColor="#fafafa"
                  ios_backgroundColor="#d4d4d4"
                />
              </View>

              {/* Profile Details */}
              <View className="w-full h-px bg-gray-300"></View>
              <Pressable
                onPress={() => setProfileDetails(true)}
                className="px-4 py-6 flex flex-row gap-4"
              >
                <Icon className="w-7 h-7" as={User} />
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-[18px]"
                >
                  Profile details
                </Text>
              </Pressable>

              {/* Logout */}
              <View className="w-full h-px bg-gray-300"></View>
              <Pressable
                onPress={() => setIsLogoutContainerOpen(true)}
                className="px-4 py-6 flex flex-row gap-4"
              >
                <Icon className="w-7 h-7" as={LogOut} />
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-[18px]"
                >
                  Log out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Profile Details Modal */}
        {profileDetails && (
          <ProfileDetails
            isLoading={isLoading}
            error={error}
            profileDetail={data.data}
            showDrawer={profileDetails}
            setShowDrawer={setProfileDetails}
          />
        )}

        {/* Logout Confirmation Modal */}
        {isLogoutContainerOpen && (
          <Modal
            visible={isLogoutContainerOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIsLogoutContainerOpen(false)}
          >
            <View className="flex h-full bg-black/50 dark:bg-black/80 items-center justify-center px-6">
              <View className="bg-white dark:bg-[#1a1919] p-6 rounded-[20px] flex flex-col gap-6 w-full max-w-sm">
                <Heading className="text-[20px] text-center">
                  Are you sure you want to log out?
                </Heading>
                <View className="flex flex-row justify-between gap-4">
                  <Button
                    onPress={() => setIsLogoutContainerOpen(false)}
                    className="bg-white rounded-[10px] border border-[#0A2533] flex-1 h-[50px]"
                  >
                    <ButtonText className="text-black text-[18px]">
                      Cancel
                    </ButtonText>
                  </Button>
                  <Button
                    onPress={handleLogout}
                    className="bg-card dark:bg-button rounded-[10px] flex-1 h-[50px]"
                  >
                    <ButtonText className="text-[18px] dark:text-white">
                      Continue
                    </ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserDetails;
