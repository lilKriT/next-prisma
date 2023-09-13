"use client";

import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import Select, { ClassNamesConfig, ThemeConfig } from "react-select";

const TaskForm = ({ users }: { users: User[] }) => {
  const userOptions = users.map((user) => {
    return { value: user.id, label: user.name };
  });

  return (
    <form className="form">
      <label className="formLabel">
        Task:
        <input type="text" className="formInput" />
      </label>
      <Select
        options={userOptions}
        isClearable={false}
        placeholder="Pick an employee"
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
