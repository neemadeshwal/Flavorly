import { Text } from "@/components/ui/text";
import { UserData } from "@/types";
import React from "react";
import { Image, View } from "react-native";

const Creator = ({ author }: { author: UserData }) => {
  return (
    <View className="pt-10 py-8">
      <View className="w-full h-px bg-gray-300 mb-8" />
      <Text style={{ fontFamily: "PoppinsBold" }} className="text-[22px]">
        Creator
      </Text>
      <View className="flex flex-row gap-3 items-center">
        <View className=" gap-2 flex flex-row items-center justify-center">
          {author.photoUrl ? (
            <Image
              source={{
                uri: author.photoUrl,
              }}
              resizeMode="cover"
              className="w-10 h-10 border-2 border border-white rounded-full "
            />
          ) : (
            <View className="flex items-center justify-center bg-button pt-2  w-14 h-14 rounded-full border border-white">
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className="text-white text-[18px]  text-center  w-full h-full uppercase rounded-full"
              >
                {author.firstname.slice(0, 1)}
                {author.lastname && author.lastname.slice(0, 1)}
              </Text>
            </View>
          )}
        </View>

        <View className=" flex flex-column justify-between items-start">
          <Text
            style={{ fontFamily: "PoppinsSemiBold" }}
            className=" capitalize text-[20px]"
          >
            {author.firstname} {author.lastname}
          </Text>
          {author.bio && (
            <Text className="text-[17px] flex-wrap">{author.bio}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Creator;
