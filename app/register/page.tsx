"use client";

import React from "react";
import { useForm, Resolver } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          console.log("Using hookform: ", data);
          console.log("Errors:", errors);
        })}
      >
        <label className="formLabel formLabel--columns">
          Name:
          <input
            {...register("name", { required: "Name is required" })}
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
              required: "Password is required.",
              minLength: { value: 5, message: "5 characters minimum." },
            })}
            type="password"
            className="formInput"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <button className="btn btn--primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
