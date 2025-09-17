import AnimatedPressable from "@/components/animation";
import FadeInView from "@/components/animation/FadeIn";
import { Text } from "@/components/ui/text";
import { images } from "@/constants/images";
import { useFeaturedRecipeList } from "@/Query/recipe";
import { useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import React from "react";
import { FlatList, Image, View } from "react-native";
import { Icon } from "../../ui/icon";
import { Spinner } from "../../ui/spinner";

const Featured = () => {
  const { data, isLoading, error } = useFeaturedRecipeList();

  if (isLoading) {
    return <Spinner />;
  }
  if (error || !data.success) {
    return (
      <View>
        <Text> Oops! an error occured.</Text>
      </View>
    );
  }

  if (!data.recipes.length) {
    return (
      <View>
        <Text className="text-gray-500 text-[18px]">
          No featured product. Trying adding one.
        </Text>
      </View>
    );
  }
  const router = useRouter();
  return (
    <View className="mt-6">
      <Text
        style={{ fontFamily: "PoppinsSemiBold" }}
        className=" text-[22px] mb-[15px] "
      >
        Featured
      </Text>
      <View>
        <FlatList
          horizontal
          data={data.recipes}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FadeInView
              duration={1000}
              delay={200}
              index={0}
              staggerDelay={150}
            >
              <AnimatedPressable
                scaleTo={1.07}
                onPress={() => router.push(`/recipe/${item._id}`)}
              >
                <View className="rounded-[25px] px-4 py-2 relative overflow-hidden bg-card dark:bg-button w-[280px] h-[220px] mr-6">
                  <Image
                    source={images.cardLineTop}
                    className="absolute top-0 left-0"
                  />
                  <Image
                    source={images.cardLineBottom}
                    className="absolute bottom-0 right-0"
                  />
                  <Image
                    source={images.cardBgLeft}
                    className=" top-1/3 absolute left-2"
                  />
                  <Image
                    className="top-1/4 absolute left-1/3"
                    source={images.cardBgRight}
                  />
                  <Image
                    source={images.cardBgTop}
                    className="absolute top-2 left-8"
                  />

                  <View className="absolute -right-4 -top-4 ">
                    <Image
                      className="w-[130px] h-[130px]   border-white border-2 rounded-full"
                      source={{
                        uri: item.imageUrl,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <View className="absolute left-4 bottom-14">
                    <Text
                      style={{ fontFamily: "PoppinsBold" }}
                      className="text-white  text-[20px]"
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View className="absolute left-4 bottom-4 gap-2 flex flex-row items-center justify-center">
                    {item.createdBy.photoUrl ? (
                      <Image
                        source={{
                          uri: item.createdBy.photoUrl,
                        }}
                        resizeMode="cover"
                        className="w-6 h-6 border border-white rounded-full "
                      />
                    ) : (
                      <View className="flex items-center justify-center dark:bg-button bg-card pt-1  w-9 h-9 rounded-full border border-white">
                        <Text
                          style={{ fontFamily: "PoppinsSemiBold" }}
                          className="text-white text-[13px]  text-center  w-full h-full uppercase rounded-full"
                        >
                          {item.createdBy.firstname.slice(0, 1)}
                          {item.createdBy.lastname &&
                            item.createdBy.lastname.slice(0, 1)}
                        </Text>
                      </View>
                    )}

                    <Text
                      style={{ fontFamily: "PoppinsSemiBold" }}
                      className="text-white capitalize"
                    >
                      {item.createdBy.firstname} {item.createdBy.lastname}
                    </Text>
                  </View>
                  <View className="absolute right-4 bottom-4 flex gap-1 justify-center items-center flex-row">
                    <Icon className="text-white" as={Clock} />
                    <Text className="text-white font-semibold">
                      {item.timeTaken}
                    </Text>
                  </View>
                </View>
              </AnimatedPressable>
            </FadeInView>
          )}
        />
      </View>
    </View>
  );
};

export default Featured;
