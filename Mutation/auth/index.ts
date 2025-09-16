import {
  checkUserExistInDB,
  createUserInBackend,
  updateUserDetail,
} from "@/api/auth";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { handleSignIn, handleSignup } from "@/services/firebase/auth";
import { useAuthStore } from "@/stores/useUserStore";
import { UserData } from "@/types";
import { useMutation } from "@tanstack/react-query";
export const useSignupMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
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
        showSuccessToast({
          title: "Signup Success",
          message: `Welcome! ${
            user?.displayName || userData.firstname + " " + userData.lastname
          }`,
          retryAction: () => {},
        });
        console.log("Signup success: ", user!.email);
      } catch (error) {
        console.log(error);
        showErrorToast({
          title: "Error in Signup",
          message:
            error instanceof Error
              ? error.message
              : "Failed to complete account setup",

          retryAction: () => {},
        });
        throw error;
      }
    },
    onError: () => {
      showErrorToast({
        title: "Error in Signup",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};

export const useEmailCheckMutation = () => {
  const { showErrorToast } = useErrorToast();

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await checkUserExistInDB(email);
      console.log(response);
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
      showErrorToast({
        title: "Account Exists",
        message: error.message || "An account with this email already exists.",
        retryAction: () => {},
      });
    },
  });
};

export const useLoginMutation = () => {
  const { showErrorToast } = useErrorToast();
  const { showSuccessToast } = useSuccessToast();

  return useMutation({
    mutationFn: handleSignIn,
    onSuccess: (user) => {
      console.log("Login success: ");

      showSuccessToast({
        title: "Login Success",
        message: `Welcome! ${"User"}`,
        retryAction: () => {},
      });
    },
    onError: () => {
      showErrorToast({
        title: "Error logging In",
        message: "An Error occured",
        retryAction: () => {},
      });
    },
  });
};

export const useUpdateMutation = () => {
  const { showErrorToast } = useErrorToast();
  const { showSuccessToast } = useSuccessToast();

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
        showSuccessToast({
          title: "Success",
          message: "Profile updated successfully.",
        });
      } else {
        showErrorToast({
          title: "Error occured",
          message: "An Error occured updating profile. Please try again.",
        });
      }
    },
    onError: () => {
      showErrorToast({
        title: "Error occured",
        message: "An Error occured",
      });
    },
  });
};
