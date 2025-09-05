import { useAuthStore } from "@/stores/useUserStore";
import React from "react";
import Step1Email from "./Step1Email";
import Step2Details from "./Step2Details";

const SignupForm = () => {
  const { email } = useAuthStore();

  if (!email) {
    return <Step1Email />;
  } else {
    return <Step2Details />;
  }
};

export default SignupForm;
