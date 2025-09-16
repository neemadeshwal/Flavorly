import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useUpdateMutation } from "@/Mutation/auth";
import { userDetailSchema } from "@/schema";
import { UserData, userDetailFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban } from "lucide-react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, ButtonText } from "../../ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../../ui/form-control";
import { CloseIcon, Icon } from "../../ui/icon";
import { Input, InputField, InputIcon } from "../../ui/input";
import { Spinner } from "../../ui/spinner";
import { VStack } from "../../ui/vstack";
const ProfileDetails = ({
  profileDetail,
  isLoading,
  error,
  showDrawer,
  setShowDrawer,
}: {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  profileDetail: UserData;
  isLoading: boolean;
  error: Error | null;
}) => {
  const {
    control,
    reset,

    handleSubmit,
    formState: { errors },
  } = useForm<userDetailFormType>({
    resolver: zodResolver(userDetailSchema),
  });

  const updateMutation = useUpdateMutation();
  async function onSubmit(values: any) {
    try {
      const response = await updateMutation.mutateAsync({
        uid: profileDetail.uid,
        userDetailData: values,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (profileDetail) {
      reset({
        firstname: profileDetail.firstname || "",
        lastname: profileDetail.lastname || "",
        phoneNumber: profileDetail.phoneNumber || "",
        bio: profileDetail.bio || "", // ass
      });
    }
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <View>
        <Text>Oops error occured</Text>
      </View>
    );
  }
  if (!profileDetail) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <Drawer
      isOpen={showDrawer}
      size="xl"
      anchor="bottom"
      onClose={() => {
        setShowDrawer(false);
      }}
    >
      <DrawerBackdrop />
      <DrawerContent className="h-[90%]">
        <DrawerHeader>
          <DrawerCloseButton className="absolute right-0">
            <Icon as={CloseIcon} />
          </DrawerCloseButton>
        </DrawerHeader>
        <DrawerBody showsVerticalScrollIndicator={false} className="mb-10">
          <FormControl className="flex flex-col gap-4" size="md">
            {/* First Name */}
            <VStack>
              <FormControlLabel>
                <FormControlLabelText className=" font-semibold mb-3 text-[20px]">
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
                      className="  placeholder:font-[500] text-[20px]"
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
                <FormControlLabelText className="font-semibold mb-3 text-[20px]">
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
                      className=" placeholder:font-[500] text-[20px]"
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

            <VStack>
              <FormControlLabel>
                <FormControlLabelText className=" font-semibold mb-3 text-[20px]">
                  Bio
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="bio"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    variant="outline"
                    className="rounded-2xl h-[90px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                  >
                    <TextareaInput
                      value={value}
                      onChangeText={onChange}
                      className=" placeholder:font-[500]  text-[20px]"
                      placeholder="Enter bio"
                      onBlur={onBlur}
                    />
                  </Textarea>
                )}
              />
              {errors.firstname && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.firstname.message}
                </Text>
              )}
            </VStack>

            {/* Email */}
            <VStack>
              <FormControlLabel>
                <FormControlLabelText className=" font-semibold mb-3 text-[20px]">
                  Email Address
                </FormControlLabelText>
              </FormControlLabel>

              <Input
                isDisabled={true}
                variant="outline"
                className="rounded-2xl h-[70px] px-4 disabled:border-gray-500 disabled:bg-gray-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
              >
                <InputField
                  value={profileDetail.email}
                  type="text"
                  className=" placeholder:font-[500] text-[20px] disabled:text-gray-500 "
                  placeholder="Enter your email"
                />
                <InputIcon as={Ban} />
              </Input>
            </VStack>
            <VStack>
              <FormControlLabel>
                <FormControlLabelText className=" font-semibold mb-3 text-[20px]">
                  Phone Number
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="phoneNumber"
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
                      className=" placeholder:font-[500] text-[20px]"
                      placeholder="Enter your number"
                    />
                  </Input>
                )}
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </VStack>
          </FormControl>

          {/* Submit Button */}
          <View className="mt-8">
            <Button
              className="w-full py-4 text-white bg-card dark:bg-button h-[70px] rounded-2xl"
              onPress={handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <ButtonText
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-[24px] dark:text-white "
                >
                  Submit
                </ButtonText>
              )}
            </Button>
          </View>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDetails;
