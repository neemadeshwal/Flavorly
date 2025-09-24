import { loginFormProps, signupFormProps } from "@/types";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { auth, db } from "./config";

import { createUserInBackend, getUserDetail } from "@/api/auth";
import { useAuthStore } from "@/stores/useUserStore";
const handleSignup = async ({
  email,
  password,
  firstname,
  lastname,
  phone,
}: signupFormProps) => {
  try {
    useAuthStore.getState().setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();
    const response = await createUserWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    );
    const data = {
      email: normalizedEmail,
      password,
      firstname,
      lastname,
      phone,
    };

    const user = response.user;
    const token = await user.getIdToken();

    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setLoading(false);

    return { user: response.user, data };
  } catch (error) {
    console.error("Error signing up", error);
    useAuthStore.getState().setLoading(false);
  }
};

const handleSignIn = async ({ email, password }: loginFormProps) => {
  useAuthStore.getState().setLoading(true);

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    const user = response.user;
    const token = await user.getIdToken();
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
    const userData = await getUserDetail(user.uid);

    if (!userData.success) {
      throw new Error(userData.message || "User donot exist in db.");
    }

    useAuthStore
      .getState()
      .setUserName(userData.data.firstname + " " + userData.data.lastname);
    useAuthStore.getState().setLoading(false);

    return response.user;
  } catch (error) {
    console.error("Error logging in.", error);
    useAuthStore.getState().setLoading(false);

    throw error;
  }
};

const checkEmailExists = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const q = query(
      collection(db, "users"),
      where("data.email", "==", normalizedEmail)
    );
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signInWithGoogle = async (authResponse: any): Promise<any> => {
  try {
    if (authResponse.type === "success") {
      const { id_token, access_token } = authResponse.params;

      const credential = GoogleAuthProvider.credential(id_token, access_token);
      const userCredential = await signInWithCredential(auth, credential);

      // Update your auth store
      const user = userCredential.user;
      const token = await user.getIdToken();

      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setToken(token);
      const userData = await getUserDetail(userCredential.user.uid);
      if (!userData.success) {
        const normalizedEmail = userCredential.user.email?.trim().toLowerCase();

        const data = {
          email: normalizedEmail,
          uid: userCredential.user.uid,
          firstname: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL,
          phoneNumber: userCredential.user.phoneNumber,
        };
        const response = await createUserInBackend(data);
        if (!response.success) {
          throw new Error(
            response.message || "Failed to create user in backend"
          );
        }
      }
      useAuthStore.getState().setUserName(userCredential.user.displayName!);

      useAuthStore.getState().setLoading(false);

      return {
        success: true,
        user: userCredential.user,
      };
    }

    return {
      success: false,
      error: "Sign-in was cancelled or failed",
    };
  } catch (error) {
    console.error("Firebase auth error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export async function signInWithFB() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
  const userCredential = await signInWithCredential(
    getAuth(),
    facebookCredential
  );
  // Sign-in the user with the credential
  const user = userCredential.user;
  const token = await user.getIdToken();

  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setToken(token);

  const userData = await getUserDetail(userCredential.user.uid);
  if (!userData.success) {
    const normalizedEmail = userCredential.user.email?.trim().toLowerCase();

    const data = {
      email: normalizedEmail,
      uid: userCredential.user.uid,
      firstname: userCredential.user.displayName,
      photoUrl: userCredential.user.photoURL,
      phoneNumber: userCredential.user.phoneNumber,
    };
    const response = await createUserInBackend(data);
    if (!response.success) {
      throw new Error(response.message || "Failed to create user in backend");
    }
  }
  useAuthStore.getState().setUserName(userCredential.user.displayName!);

  useAuthStore.getState().setLoading(false);
  return {
    success: true,
    user: userCredential.user,
  };
}
export { checkEmailExists, handleSignIn, handleSignup };
