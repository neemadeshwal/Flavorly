import { ChefHat } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Icon } from "../ui/icon";
import AddRecipe from "./AddRecipe";

const OpenAdd = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <View>
      <View>
        <Button
          onPress={() => setIsAddDialogOpen(true)}
          className="  rounded-full w-20 h-20 bg-card dark:bg-button absolute bottom-[70px] left-[43%]"
        >
          <ButtonText className="text-white capitalize  rounded-full">
            <Icon as={ChefHat} className="text-white text-[30px] w-14 h-14" />
          </ButtonText>
        </Button>
      </View>
      {isAddDialogOpen && (
        <Modal
          visible={isAddDialogOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsAddDialogOpen(false)}
        >
          <View className="flex-1 bg-gray-800/50 bg-opacity-50 justify-center items-center">
            <AddRecipe setCloseDialog={setIsAddDialogOpen} />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default OpenAdd;
