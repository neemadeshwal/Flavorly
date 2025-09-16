import { Text } from "@/components/ui/text";
import { foodEmojis } from "@/constants/emoji";
import { ingredient } from "@/types";
import React from "react";
import { View } from "react-native";

const Ingredients = ({ ingredients }: { ingredients: ingredient[] }) => {
  console.log(ingredients, "ingredients");
  const getFoodEmoji = (itemName: string) => {
    const match = foodEmojis.find((e) =>
      itemName.toLowerCase().includes(e.name)
    );
    return match?.emoji || "🧺";
  };

  return (
    <View className="pt-8 px-1">
      <View>
        <Text style={{ fontFamily: "PoppinsSemiBold" }} className="text-[18px]">
          Ingredients
        </Text>
        <Text className="text-gray-500 text-[16px]">
          {ingredients.length} Item
        </Text>
      </View>
      <View className="flex flex-col gap-6">
        {ingredients.map((item, index) => (
          <View
            key={item.name}
            style={{
              // iOS Shadow - even on all sides
              shadowColor: "#063336",
              shadowOffset: { width: 0, height: 0 }, // Zero offset = even distribution
              shadowOpacity: 0.12,
              shadowRadius: 6, // Smaller radius keeps shadow close to edges
              // Android Shadow
              elevation: 4,
            }}
            className="bg-white dark:bg-[#121212] w-full p-4 rounded-[15px] flex flex-row  justify-between items-center gap-3 "
          >
            <View className="flex flex-row gap-3 items-center">
              <View className="bg-[#E6EBF2] dark:bg-[#181818] w-fit rounded-xl p-4 px-6">
                <Text className="text-[20px]">{getFoodEmoji(item.name)}</Text>
              </View>
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className="text-[18px]"
              >
                {item.name}
              </Text>
            </View>
            <View>
              <Text
                style={{ fontFamily: "PoppinsSemiBold" }}
                className="text-[18px] mr-6"
              >
                {item.quantity} {item.unit}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Ingredients;
