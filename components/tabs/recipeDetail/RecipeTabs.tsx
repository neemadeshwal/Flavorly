import { ingredient, instruction } from "@/types";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, ButtonText } from "../../ui/button";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

const RecipeTabs = ({
  instructions,
  ingredients,
  timeTaken,
}: {
  instructions: instruction[];
  ingredients: ingredient[];
  timeTaken: string;
}) => {
  const [isInstructionsActive, setIsInstructionsActive] = useState(false);
  return (
    <View className=" pt-8 pb-6">
      <View className="bg-[#E6EBF2] dark:bg-[#121212] rounded-[25px] p-2 flex justify-center flex-row">
        <Button
          onPress={() => setIsInstructionsActive(false)}
          className={` h-[60px] w-[50%] ${
            !isInstructionsActive
              ? "bg-card dark:bg-[#042628] rounded-[25px]"
              : "bg-transparent"
          }`}
        >
          <ButtonText
            style={{ fontFamily: "PoppinsBold" }}
            className={` text-[18px] ${
              !isInstructionsActive
                ? "text-white "
                : "text-black dark:text-white"
            }`}
          >
            Ingredients
          </ButtonText>
        </Button>
        <Button
          onPress={() => setIsInstructionsActive(true)}
          className={`  h-[60px]  w-[50%] ${
            isInstructionsActive
              ? "bg-card dark:bg-[#042628]  rounded-[25px]"
              : "bg-transparent"
          }`}
        >
          <ButtonText
            style={{ fontFamily: "PoppinsBold" }}
            className={` text-[18px] ${
              isInstructionsActive
                ? "text-white "
                : "text-black dark:text-white"
            }`}
          >
            Instructions
          </ButtonText>
        </Button>
      </View>
      {!isInstructionsActive ? (
        <Ingredients ingredients={ingredients} />
      ) : (
        <Instructions timeTaken={timeTaken} instructions={instructions} />
      )}
    </View>
  );
};

export default RecipeTabs;
