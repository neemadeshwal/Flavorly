import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import React from "react";
import { Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { useEmailCheckMutation } from "@/Mutation/auth";
import { EmailSchema } from "@/schema";
import { useAuthStore } from "@/stores/useUserStore";
import { emailFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const Step1Email = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<emailFormProps>({
    resolver: zodResolver(EmailSchema),
  });
  const { email } = useAuthStore();
  const emailMutation = useEmailCheckMutation();

  const setEmail = useAuthStore((state) => state.setEmail);
  async function onSubmitEmail(data: { email: string }) {
    try {
      const { email } = data;
      const response = await emailMutation.mutateAsync(email);

      console.log(response);

      setEmail(data.email);
    } catch (error) {
      console.log(error);
    } finally {
      setValue("email", "");
    }
  }
  if (email) return null;
  return (
    <View>
      <View className="mb-8 flex flex-col gap-3">
        <Text className="text-[24px] text-center font-semibold">
          Let's get started
        </Text>
        <Text className="text-[18px] font-[400] text-center">
          Enter your email to continue
        </Text>
      </View>
      <FormControl className="flex flex-col gap-4" size="md">
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-3 text-[20px]">
              Email Address
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
              >
                <InputField
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="text-black placeholder:text-gray-400 placeholder:font-[500] text-[20px]"
                  placeholder="Enter your email"
                />
              </Input>
            )}
          />

          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </Text>
          )}
        </VStack>
      </FormControl>

      <View className="mt-8">
        <Button
          className="w-full py-4 text-white bg-card h-[70px] rounded-2xl"
          onPress={handleSubmit(onSubmitEmail)}
        >
          {emailMutation.isPending ? (
            <Spinner />
          ) : (
            <ButtonText className="text-[24px]">Continue</ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Step1Email;
