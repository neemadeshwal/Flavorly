import { HStack } from "@/components/ui/hstack";
import { CheckCircleIcon, CloseIcon, Icon } from "@/components/ui/icon";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Pressable } from "react-native";

const useSuccessToast = () => {
  const toast = useToast();

  const showSuccessToast = ({
    title,
    message,
    retryAction,
  }: {
    title: string;
    message: string;
    retryAction?: () => void;
  }) => {
    const id = String(Math.random());
    toast.show({
      id,
      placement: "top",
      duration: 4000,
      containerStyle: {
        marginTop: 60,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 30,
      },
      render: ({ id }) => (
        <Toast
          action="success"
          variant="outline"
          nativeID={"toast-" + id}
          className="p-4 gap-3 border-success-500 shadow-hard-5 rounded-[20px] bg-white w-full flex-row justify-between items-start"
        >
          <HStack space="md">
            <Icon as={CheckCircleIcon} className="stroke-success-500 mt-0.5" />
            <VStack space="xs">
              <ToastTitle className="font-semibold text-success-500">
                {title}
              </ToastTitle>
              <ToastDescription size="sm">{message}</ToastDescription>
            </VStack>
          </HStack>
          <HStack className="min-[450px]:gap-3 gap-1">
            <Pressable onPress={() => toast.close(id)}>
              <Icon as={CloseIcon} />
            </Pressable>
          </HStack>
        </Toast>
      ),
    });
  };

  return { showSuccessToast };
};

export default useSuccessToast;
