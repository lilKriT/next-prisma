"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Link from "next/link";

const url = "http://localhost:3000";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    getValues,
    reset,
    setError,
    clearErrors,
  } = useForm();

  const registerUser: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    console.log("Using hookform: ", data);
    // console.log("Errors:", errors);

    const throttle = true;
    if (throttle) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("Submitting");

    const res = await fetch(`${url}/api/users/register`, {
      method: "POST",
      // Seems like I don't need content/type nor credentials?
      body: JSON.stringify({ name: data.name, password: data.password }),
    });

    if (!res.ok) {
      setError("nameTaken", { message: "User already exists." });
    }
    const json = await res.json();
  };

  const testRegister: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    console.log("Trying");
    setError("nameTaken", { message: "User already exists." });
  };

  const onError: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    console.log("Error");
    setError("nameTaken", { message: "User already exists." });
  };

  // Reset form if success
  useEffect(() => {
    // console.log("Effect");
    if (isSubmitSuccessful) {
      reset({
        name: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      // console.log("Not succesful");
    }
  }, [formState, isSubmitSuccessful, reset]);

  return (
    <div className="container flex items-center">
      <form className="form" onSubmit={handleSubmit(registerUser, onError)}>
        {/* Name */}
        <label className="formLabel formLabel--columns">
          Name:
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "3 Characters minimum" },
              onChange: (e) => clearErrors("nameTaken"),
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
        {errors.nameTaken && (
          <p className="text-red-500">{`${errors.nameTaken.message}`}</p>
        )}
        <button
          type="submit"
          className="btn btn--primary mt-8"
          disabled={isSubmitting}
        >
          Register
        </button>
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
