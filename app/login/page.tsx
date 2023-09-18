import React from "react";
import LoginComponent from "./LoginComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to fully experience Get it Done!",
};

const LogIn = () => {
  return (
    <div className="container flex items-center">
      <LoginComponent />
    </div>
  );
};

export default LogIn;
