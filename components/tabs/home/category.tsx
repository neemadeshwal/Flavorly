import { Text } from "@/components/ui/text";
import { useRecipeStore } from "@/stores/useRecipeStore";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, ButtonText } from "../../ui/button";

const categoryArray = [
  { id: "breakfast", title: "Breakfast" },
  { id: "lunch", title: "Lunch" },
  { id: "dinner", title: "Dinner" },
  { id: "snack", title: "Snack" },
  { id: "dessert", title: "Dessert" },
  { id: "beverage", title: "Beverage" },
  { id: "appetizer", title: "Appetizer" },
  { id: "main-course", title: "Main Course" },
  { id: "side-dish", title: "Side Dish" },
  { id: "salad", title: "Salad" },
  { id: "soup", title: "Soup" },
  { id: "smoothie", title: "Smoothie" },
  { id: "grill", title: "Grill" },
  { id: "baking", title: "Baking" },
];

const Category = () => {
  // Subscribe to store changes properly
  const selectedCategory = useRecipeStore((state) => state.category);
  const setCategory = useRecipeStore((state) => state.setCategory);

  const handleCategoryPress = (categoryTitle: string) => {
    setCategory(categoryTitle);
  };

  return (
    <View>
      <View className="justify-between items-center flex-row">
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className=" text-[22px] mb-[15px] "
        >
          Category
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row gap-4 "
        >
          {categoryArray.map((item) => {
            return (
              <Button
                android_ripple={{ color: "transparent" }}
                onPress={() => handleCategoryPress(item.title)}
                key={item.id}
                className={`${
                  selectedCategory === item.title
                    ? "bg-card dark:bg-button"
                    : "bg-gray-200 "
                } rounded-full w-[130px] mr-4 h-[50px] text-center   `}
              >
                <ButtonText
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className={`${
                    selectedCategory === item.title
                      ? "text-white"
                      : "text-black"
                  }  capitalize text-[18px]`}
                >
                  {item.title}
                </ButtonText>
              </Button>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;
