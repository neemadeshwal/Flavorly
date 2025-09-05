import { Clock } from "lucide-react-native";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Icon } from "../ui/icon";

const data = [
  {
    title: "Manchurian with red sauce",
    id: "1",
    author: {
      authorId: "author1",
      authorName: "emma watson",
    },
    image: "",
    timeTaken: "20",
  },
  {
    title: "Manchurian with red sauce",
    id: "2",
    author: {
      authorId: "author1",
      authorName: "emma watson",
    },
    image: "",
    timeTaken: "20",
  },
  {
    title: "Manchurian with red sauce",
    id: "3",
    author: {
      authorId: "author1",
      authorName: "emma watson",
    },
    image: "",
    timeTaken: "20",
  },
];
const Featured = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://png.pngtree.com/png-vector/20241205/ourmid/pngtree-spicy-gobi-manchurian-recipe-png-image_14548094.png",
        }}
        resizeMode="cover"
        className="w-6 h-6 rounded-full mr-2"
      />

      <Text className="font-bold text-[22px] mb-[15px] ">Featured</Text>
      <View>
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="rounded-[20px] px-4 py-2 relative bg-card w-[280px] h-[200px] mr-6">
              <View className="absolute right-2 top-2">
                <Image
                  className="w-28 h-28 rounded-full"
                  source={{
                    uri: "https://atanurrannagharrecipe.com/wp-content/uploads/2023/01/Veg-Manchurian-for-website.jpg",
                  }}
                  resizeMode="cover"
                />
              </View>
              <View className="absolute left-4 top-10">
                <Text className="text-white font-bold text-[24px]">
                  {item.title}
                </Text>
              </View>
              <View className="absolute left-4 bottom-4 flex items-center justify-center">
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  }}
                  resizeMode="cover"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <Text className="text-white capitalize font-bold">
                  {item.author.authorName}
                </Text>
              </View>
              <View className="absolute right-4 bottom-4 flex gap-1 justify-center items-center flex-row">
                <Icon className="text-white" as={Clock} />
                <Text className="text-white font-semibold">
                  {item.timeTaken} min
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Featured;
