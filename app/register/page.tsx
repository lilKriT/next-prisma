"use client";

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    console.log("Using hookform: ", data);
    console.log("Errors:", errors);
  };

  return (
    <div className="container flex items-center">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <label className="formLabel formLabel--columns">
          Name:
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "3 Characters minimum" },
            })}
            type="text"
            className="formInput"
          />
        </label>
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}

        {/* Password */}
        <label className="formLabel formLabel--columns">
          Password:
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: { value: 3, message: "3 characters minimum." },
            })}
            type="password"
            className="formInput"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}

        {/* Confirm Password */}
        <label className="formLabel formLabel--columns">
          Confirm Password:
          <input
            {...register("confirmPassword", {
              required: "Password is required.",
              minLength: { value: 3, message: "3 characters minimum." },
              validate: {
                passwordsMatch: (value) =>
                  value === getValues().password || "Passwords must match!",
              },
            })}
            type="password"
            className="formInput"
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button className="btn btn--primary mt-8">Register</button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="link">
            Log in!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
