"use client";

const url = process.env.NEXT_PUBLIC_URL;

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
    setError,
    clearErrors,
  } = useForm();
  const router = useRouter();

  const registerUser: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    // Simulate slowdown?
    const throttle = true;
    if (throttle) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const res = await fetch(`${url}/api/users/register`, {
      method: "POST",
      // Seems like I don't need content/type nor credentials?
      body: JSON.stringify({ name: data.name, password: data.password }),
    });

    if (!res.ok) {
      setError("nameTaken", { message: "User already exists." });
    }
    const json = await res.json();
    return json;
  };

  // Reset form if success
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/"); // Where to send user?
    }
  }, [isSubmitSuccessful, reset, router]);

  return (
    <form className="form" onSubmit={handleSubmit(registerUser)}>
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
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="link">
          Log in!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
