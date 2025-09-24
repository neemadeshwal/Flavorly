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
import { useLoginMutation } from "@/hooks/mutation/auth";
import { loginSchema } from "@/schema";
import { loginFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();
  async function onSubmit(data: loginFormType) {
    if (loginMutation.isPending) return;
    try {
      await loginMutation.mutateAsync(data);
      router.push("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <VStack className="flex flex-col  justify-between">
      <FormControl size="md" className="flex flex-col gap-2">
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-2 text-[20px]">
              Email Address
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
              type="text"
              onChangeText={(text) => setValue("email", text)}
              className="
        text-black 
        placeholder:font-[500]
        text-[20px]
        focus:outline-none
    focus:border-red-500
            
            "
              placeholder="Enter your email"
              {...register("email")}
            />
          </Input>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </Text>
          )}
        </VStack>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText className="text-black font-semibold mb-2 text-[20px]">
              Password
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
              type={showPassword ? "text" : "password"}
              className="
        text-black 
        placeholder:font-[500]
        text-[20px]
            
            "
              placeholder="Enter your password"
              onChangeText={(text) => setValue("password", text)}
              {...register("password")}
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
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </Text>
          )}
        </VStack>
        <Button
          className="w-full py-4 mt-4 text-white bg-card h-[70px] rounded-2xl"
          onPress={handleSubmit(onSubmit)}
        >
          {loginMutation.isPending ? (
            <Spinner />
          ) : (
            <ButtonText className=" text-[24px] ">Submit</ButtonText>
          )}
        </Button>
      </FormControl>
    </VStack>
  );
};

export default LoginForm;
