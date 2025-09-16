import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const Account = ({ account }: any) => {
  const router = useRouter();
  return (
    <View>
      <Text
        style={{ fontFamily: "PoppinsSemiBold" }}
        className="text-[22px] capitalize mb-6"
      >
        Account
      </Text>

      <TouchableOpacity
        onPress={() => router.push(`/user/${account.uid}`)}
        activeOpacity={0.8}
        className="bg-white dark:bg-[#181818] mb-6 p-5 rounded-3xl flex-row items-center w-full"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* Avatar */}
        <View className="w-[65px] h-[65px] mr-4">
          {account.photoUrl ? (
            <Image
              className="w-full h-full rounded-2xl"
              source={{ uri: account.photoUrl }}
              style={{ resizeMode: "cover" }}
            />
          ) : (
            <View className="bg-card dark:bg-button w-full h-full rounded-full uppercase flex items-center justify-center border border-white/20">
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className=" text-[20px] uppercase  text-white"
              >
                {account.firstname.charAt(0)}
                {account.lastname.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className=" mr-3">
          <Text
            style={{ fontFamily: "PoppinsSemiBold" }}
            className="text-[19px] text-gray-900 dark:text-gray-300 capitalize leading-6"
            numberOfLines={1}
          >
            {account.firstname} {account.lastname}
          </Text>
          <Text
            style={{ fontFamily: "PoppinsRegular" }}
            className="text-[13px] text-gray-500 mt-0.5"
          >
            Tap to view profile
          </Text>
        </View>

        {/* Arrow */}
        <View className="bg-card absolute right-2 dark:bg-button  p-3 rounded-full shadow-sm">
          <Icon as={ArrowRight} className="text-white w-5 h-5" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Account;
