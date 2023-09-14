"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import Select, { ClassNamesConfig, ThemeConfig } from "react-select";

const url = "http://localhost:3000";

const TaskForm = ({ users }: { users: User[] }) => {
  const [title, setTitle] = useState("");
  const [employee, setEmployee] = useState<{
    value: number;
    label: string;
  }>();

  const router = useRouter();

  // Should this be an effect?
  const userOptions = users.map((user) => {
    return { value: user.id, label: user.name };
  });

  // Sending
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting");

    if (title === "" || !employee) {
      return;
    }

    try {
      const res = await fetch(`${url}/api/tasks`, {
        method: "POST",
        body: JSON.stringify({ title, userId: employee.value }),
      });
      if (res.ok) {
        console.log("All good");
      } else {
        console.log("Not good");
      }
      router.refresh();
    } catch (error) {
      console.log("Something wrong");
    }
    console.log("Submitted");
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <label className="formLabel">
        Task:
        <input
          type="text"
          className="formInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <Select
        name="taskEmployee"
        options={userOptions}
        isClearable={false}
        placeholder="Pick an employee"
        onChange={(option) => {
          if (option) {
            setEmployee({ value: option.value, label: option.label });
          }
        }}
        required
        value={employee || undefined}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "black",
            borderColor: "darkcyan",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
          }),

          menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "black",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "darkgray" : "black",
          }),
        }}
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
      ></Select>
      <button className="btn btn--primary">Add task</button>
    </form>
  );
};

export default TaskForm;
