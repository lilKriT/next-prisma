import React from "react";
import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account.",
};

const Register = () => {
  return (
    <div className="container flex items-center">
      <RegisterForm />
    </div>
  );
};

export default Register;
