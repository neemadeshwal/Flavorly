import { UserData } from "react-native-fbsdk-next";
import instance from "./axios";
export const createUserInBackend = async (userData: UserData) => {
  try {
    const response = await instance.post("/auth/new", userData);

    return response.data;
  } catch (error) {
    console.log(error, "error creating user");
    throw error;
  }
};

export const checkUserExistInDB = async (email: string) => {
  console.log("baseurl", instance.defaults.baseURL);
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const response = await instance.get("/auth/userExist", {
      params: { email: normalizedEmail },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error, "error searching db");
    throw error;
  }
};

export const getUserDetail = async (uid: string) => {
  try {
    const response = await instance.get(`/auth/userDetails/${uid}`);
    return response.data;
  } catch (error) {
    console.log(error, "error getting user detail");
    throw error;
  }
};

export const updateUserDetail = async (
  uid: string,
  userDetailData: UserData
) => {
  try {
    const response = await instance.patch(
      `/auth/userDetails/${uid}`,
      userDetailData
    );
    return response.data;
  } catch (error) {
    console.log(error, "an error ocured");
    throw error;
  }
};
