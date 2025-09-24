import {
  checkUserExistInDB,
  createUserInBackend,
  updateUserDetail,
} from "@/api/auth";
import useCustomToast from "@/hooks/customHooks/useCustomToast";
import { handleSignIn, handleSignup } from "@/services/firebase/auth";
import { useAuthStore } from "@/stores/useUserStore";
import { UserData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useSignupMutation = () => {
  const { showCustomToast } = useCustomToast();
  return useMutation({
    mutationFn: handleSignup,
    onSuccess: async ({ user, data }: any) => {
      if (!user) return;

      try {
        let userData: UserData = {
          uid: "",
          firstname: "",
          email: "",
          password: "",
        };
        userData.firstname = data.firstname;
        userData.lastname = data.lastname ?? "";
        userData.email = data.email;
        userData.phone = data.phone ?? "";
        userData.uid = user.uid;
        const response = await createUserInBackend(userData);
        if (!response.success) {
          throw new Error(
            response.message || "Failed to create user in backend"
          );
        }
        useAuthStore
          .getState()
          .setUserName(userData.firstname + " " + userData.lastname);
        showCustomToast({
          title: "Signup Success",
          message: `Welcome! ${
            user?.displayName || userData.firstname + " " + userData.lastname
          }`,
          isError: false,
        });
      } catch (error) {
        console.log(error);
        showCustomToast({
          title: "Error in Signup",
          message:
            error instanceof Error
              ? error.message
              : "Failed to complete account setup",
          isError: true,
        });
        throw error;
      }
    },
    onError: () => {
      showCustomToast({
        title: "Error in Signup",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};

export const useEmailCheckMutation = () => {
  const { showCustomToast } = useCustomToast();

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await checkUserExistInDB(email);
      if (!response.success) {
        throw new Error("Email already exists");
      }
      return !response.success;
    },
    onSuccess: () => {
      console.log("Email is available. Proceed with signup.");
      // Do nothing — allow form to continue
    },
    onError: (error) => {
      showCustomToast({
        title: "Account Exists",
        message: error.message || "An account with this email already exists.",
        isError: true,
      });
    },
  });
};

export const useLoginMutation = () => {
  const { showCustomToast } = useCustomToast();

  return useMutation({
    mutationFn: handleSignIn,
    onSuccess: (user) => {
      showCustomToast({
        title: "Login Success",
        message: `Welcome! ${"User"}`,
        isError: false,
      });
    },
    onError: () => {
      showCustomToast({
        title: "Error logging In",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};

export const useUpdateMutation = () => {
  const { showCustomToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      uid,
      userDetailData,
    }: {
      uid: string;
      userDetailData: UserData;
    }) => updateUserDetail(uid, userDetailData),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user-detail"] });
        showCustomToast({
          title: "Success",
          message: "Profile updated successfully.",
          isError: false,
        });
      } else {
        showCustomToast({
          title: "Error occured",
          message: "An Error occured updating profile. Please try again.",
          isError: true,
        });
      }
    },
    onError: () => {
      showCustomToast({
        title: "Error occured",
        message: "An Error occured",
        isError: true,
      });
    },
  });
};
