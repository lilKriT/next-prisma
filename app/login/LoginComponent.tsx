"use client";
import { useAuthContext } from "@/lib/context/provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const url = process.env.NEXT_PUBLIC_URL;

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    clearErrors,
  } = useForm();

  const router = useRouter();

  const { setId, setName, setRole, setAccessToken } = useAuthContext();

  const loginUser = async (data: FieldValues) => {
    // Simulate slowdown?
    const throttle = false;
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
      setId(json.id);
      setName(json.name);
      setRole(json.role);
      setAccessToken(json.accessToken);
      //   return json;
    } catch (error) {
      console.log("Catch: ", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        password: "",
      });
      router.push("/"); // Where to send user?
      router.refresh();
    }
  }, [isSubmitSuccessful, reset, router]);

  return (
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
        {"You don't have an account? "}
        <Link href={"/register"} className="link">
          Register!
        </Link>
      </p>
    </form>
  );
};

export default LoginComponent;
