"use client";

import { useState, useEffect } from "react";
import Select, { ClassNamesConfig, ThemeConfig } from "react-select";

const TaskForm = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <form className="form">
      <label className="formLabel">
        Task:
        <input type="text" className="formInput" />
      </label>
      <Select
        options={options}
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
      ></Select>
      <button className="btn btn--primary">Add task</button>
    </form>
  );
};

export default TaskForm;
