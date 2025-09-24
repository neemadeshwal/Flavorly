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

const useCustomToast = () => {
  const toast = useToast();

  const showCustomToast = ({
    title,
    message,
    isError,
    retryAction,
  }: {
    title: string;
    message: string;
    isError: boolean;
    retryAction?: () => {};
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
          action={isError ? "error" : "success"}
          variant="outline"
          nativeID={"toast-" + id}
          className={`p-4 gap-3 ${
            isError ? "border-error-500" : "border-success-500"
          }  shadow-hard-5 rounded-[20px] bg-white w-full flex-row justify-between items-start`}
        >
          <HStack space="md">
            <Icon
              as={CheckCircleIcon}
              className={` ${
                isError ? "stroke-error-500" : "stroke-success-500"
              } mt-0.5`}
            />
            <VStack space="xs">
              <ToastTitle
                className={`font-semibold ${
                  isError ? "text-error-500" : "text-success-500"
                }`}
              >
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

  return { showCustomToast };
};

export default useCustomToast;
