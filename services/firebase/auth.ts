import { loginFormProps, signupFormProps } from "@/types";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { auth, db } from "./config";

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
    console.log("User signup  successful");
    const data = {
      email: normalizedEmail,
      password,
      firstname,
      lastname,
      phone,
    };
    await storeDataInFirestore(data);

    const user = response.user;
    const token = await user.getIdToken();

    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setLoading(false);

    return response.user;
  } catch (error) {
    console.error("Error signing up", error);
    useAuthStore.getState().setLoading(false);
  }
};

const handleSignIn = async ({ email, password }: loginFormProps) => {
  useAuthStore.getState().setLoading(true);

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successful");
    const user = response.user;
    const token = await user.getIdToken();
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setLoading(false);

    return response.user;
  } catch (error) {
    console.error("Error logging in.", error);
    useAuthStore.getState().setLoading(false);

    throw error;
  }
};

const storeDataInFirestore = async (data: signupFormProps) => {
  try {
    const response = await addDoc(collection(db, "users"), {
      data,

      Timestamp: new Date(),
    });
    console.log("Document written with Id: ", response.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
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
    console.log("Found documents:", querySnapshot.size);
    querySnapshot.forEach((doc) => {
      console.log("Document data:", doc.data());
    });

    return !querySnapshot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signInWithGoogle = async (
  promptAsync: () => Promise<any>
): Promise<any> => {
  try {
    const result = await promptAsync();
    console.log(result);
    if (result.type === "success") {
      const { id_token, access_token } = result.params;

      const credential = GoogleAuthProvider.credential(id_token, access_token);
      const userCredential = await signInWithCredential(auth, credential);
      console.log(userCredential);
      return {
        success: true,
        user: userCredential.user,
      };
    }

    return {
      success: false,
      error: "Sign-in was cancelled",
    };
  } catch (error) {
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

  console.log(token);

  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setToken(token);
  useAuthStore.getState().setLoading(false);
  return true;
}
export { checkEmailExists, handleSignIn, handleSignup };
