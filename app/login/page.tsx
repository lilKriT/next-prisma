"use client";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const url = "http://localhost:3000";

// Ok this won't work since this is a client component.
export const metadata: Metadata = {
  title: "Login to Get it Done!",
  description: "Login page.",
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    clearErrors,
  } = useForm();

  const loginUser = async (data: FieldValues) => {
    console.log("Logging in");

    // Simulate slowdown?
    const throttle = true;
    if (throttle) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
      const res = await fetch(`${url}/api/users`, {
        method: "POST",
        body: JSON.stringify({ name: data.name, password: data.password }),
      });
      if (!res.ok) {
        setError("wrongCredentials", { message: "Wrong credentials." });
      }
      const json = await res.json();

      // console.log(`Role: ${json.role}, accessToken: ${json.accessToken}`);
      return json;
    } catch (error) {
      console.log("Catch: ", error);
    }
  };

  return (
    <div className="container flex items-center">
      <form className="form" onSubmit={handleSubmit(loginUser)}>
        <label className="formLabel formLabel--columns">
          Name:
          <input
            {...register("name", {
              required: "Name is required",
              onChange: (e) => {
                clearErrors("wrongCredentials");
              },
            })}
            type="text"
            className="formInput"
          />
        </label>
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}
        <label className="formLabel formLabel--columns">
          Password:
          <input
            {...register("password", {
              required: "Password is required",
              onChange: (e) => {
                clearErrors("wrongCredentials");
              },
            })}
            type="password"
            className="formInput"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        {errors.wrongCredentials && (
          <p className="text-red-500">{`${errors.wrongCredentials.message}`}</p>
        )}
        <button className="btn btn--primary mt-8" disabled={isSubmitting}>
          Log In
        </button>
        <p className="text-center text-sm">
          You don't have an account?{" "}
          <Link href={"/register"} className="link">
            Register!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
