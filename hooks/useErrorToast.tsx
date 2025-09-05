import { HStack } from "@/components/ui/hstack";
import { CloseIcon, HelpCircleIcon, Icon } from "@/components/ui/icon";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Pressable } from "react-native";

const useErrorToast = () => {
  const toast = useToast();

  const showErrorToast = ({
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
      duration: 4000, // Slightly longer for better readability
      containerStyle: {
        marginTop: 60,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 30,
      },
      render: ({ id }) => (
        <Toast
          action="error"
          variant="outline"
          nativeID={"toast-" + id}
          className="p-4 gap-3 border-error-500 shadow-lg rounded-[20px] bg-white w-full flex-row justify-between items-start"
        >
          {/* Left side: Icon and Content */}
          <HStack space="md" className="flex-1">
            <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
            <VStack space="xs" className="flex-1">
              <ToastTitle className="font-semibold text-error-500">
                {title}
              </ToastTitle>
              <ToastDescription size="sm" className="text-gray-600">
                {message}
              </ToastDescription>
            </VStack>
          </HStack>

          {/* Right side: Close Button */}
          <Pressable onPress={() => toast.close(id)} className="p-1">
            <Icon as={CloseIcon} className="stroke-gray-400" />
          </Pressable>
        </Toast>
      ),
    });
  };

  return { showErrorToast };
};

export default useErrorToast;
