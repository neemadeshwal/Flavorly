import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import {
  checkEmailExists,
  handleSignIn,
  handleSignup,
} from "@/services/firebase/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  return useMutation({
    mutationFn: handleSignup,
    onSuccess: (user) => {
      console.log("Signup success: ", user!.email);

      showSuccessToast({
        title: "Signup Success",
        message: `Welcome! ${user?.displayName || "User"}`,
        retryAction: () => {},
      });
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
      const exists = await checkEmailExists(email);
      console.log(exists);
      if (exists) {
        throw new Error("Email already exists");
      }
      return true;
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
