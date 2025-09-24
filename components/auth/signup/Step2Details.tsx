import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSignupMutation } from "@/hooks/mutation/auth";
import { signupSchema } from "@/schema";
import { useAuthStore } from "@/stores/useUserStore";
import { signFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
const Step2Details = () => {
  const {
    control,
    reset,

    handleSubmit,
    formState: { errors },
  } = useForm<signFormType>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { email } = useAuthStore();

  const router = useRouter();

  const signupMutation = useSignupMutation();

  async function onSubmit(data: signFormType) {
    if (data.password !== confirmPasswordInput) {
      setConfirmPasswordError(true);
      return;
    }
    if (signupMutation.isPending) return;

    try {
      const response = await signupMutation.mutateAsync({
        ...data,
        email: email!,
      });

      reset();
      setConfirmPasswordInput("");
      setConfirmPasswordError(false);
      router.push("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  }
  if (!email) return null;

  return (
    <View className="flex flex-col bg-white dark:bg-[#181818]  ">
      <View className="mb-8 flex flex-col gap-3">
        <Text className="text-[24px] text-center font-semibold">
          Tell us about yourself
        </Text>
        <Text className="text-[18px] font-[400] text-center">
          Let's start with the basics
        </Text>
      </View>

      <FormControl className="flex flex-col gap-4" size="md">
        {/* First Name */}
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-3 text-[20px]">
              First name
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="firstname"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
              >
                <InputField
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  className="text-black placeholder:text-gray-400 placeholder:font-[500] text-[20px]"
                  placeholder="Enter your first name"
                  onBlur={onBlur}
                />
              </Input>
            )}
          />
          {errors.firstname && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.firstname.message}
            </Text>
          )}
        </VStack>

        {/* Last Name */}
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-3 text-[20px]">
              Last name
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="lastname"
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
                  placeholder="Enter your last name"
                />
              </Input>
            )}
          />

          {errors.lastname && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.lastname.message}
            </Text>
          )}
        </VStack>

        {/* Email */}
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-3 text-[20px]">
              Email Address
            </FormControlLabelText>
          </FormControlLabel>

          <Input
            isDisabled={!!email}
            variant="outline"
            className="rounded-2xl h-[70px] px-4 disabled:border-gray-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
          >
            <InputField
              type="text"
              value={email}
              className="text-black placeholder:font-[500] text-[20px]"
              placeholder="Enter your email"
            />
          </Input>
        </VStack>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-3 text-[20px]">
              Phone Number
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
              >
                <InputField
                  type="text"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  className="text-black placeholder:text-gray-400 placeholder:font-[500] text-[20px]"
                  placeholder="Enter your number"
                />
              </Input>
            )}
          />
          {errors.phone && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </Text>
          )}
        </VStack>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-2 text-[20px]">
              Password
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                className="rounded-2xl
          h-[70px]
          px-4
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]  border-2 border-gray-300

        "
              >
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  className="
        text-black placeholder:text-gray-400
        placeholder:font-[500]
        text-[20px]
            
            "
                  placeholder="Enter your password"
                />
                <Button
                  className="bg-transparent m-0 p-0"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Icon
                      as={EyeOffIcon}
                      className="text-typography-500 m-2 w-8 h-8"
                    />
                  ) : (
                    <Icon
                      as={EyeIcon}
                      className="text-typography-500 m-2 w-8 h-8"
                    />
                  )}
                </Button>
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </Text>
          )}
        </VStack>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-2 text-[20px]">
              Confirm Password
            </FormControlLabelText>
          </FormControlLabel>

          <Input
            variant="outline"
            className="rounded-2xl
          h-[70px]
          px-4
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]  border-2 border-gray-300

        "
          >
            <InputField
              type="password"
              className="
        text-black placeholder:text-gray-400
        placeholder:font-[500]
        text-[20px]
            
            "
              placeholder="Enter your password"
              value={confirmPasswordInput}
              onChangeText={(text) => setConfirmPasswordInput(text)}
            />
            <Button
              className="bg-transparent m-0 p-0"
              onPress={() => setShowPassword((prev) => !prev)}
            ></Button>
          </Input>
          {confirmPasswordError && (
            <Text className="text-red-500 text-sm mt-1">
              Both Password should match
            </Text>
          )}
        </VStack>
      </FormControl>

      {/* Submit Button */}
      <View className="mt-8">
        <Button
          className="w-full py-4 text-white bg-card  dark:bg-button h-[70px] rounded-2xl"
          onPress={handleSubmit(onSubmit)}
        >
          {signupMutation.isPending ? (
            <Spinner />
          ) : (
            <ButtonText className="text-[24px]">Submit</ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Step2Details;
