"use client";

import { useState, useEffect } from "react";

const TaskForm = () => {
  return (
    <form className="form">
      <label className="formLabel">
        Task:
        <input type="text" className="formInput" />
      </label>
      <select
        name=""
        id=""
        className="formSelect"
        placeholder="Choose something"
      >
        <option value="123" disabled selected hidden>
          Choose an employee
        </option>
        <option value="123">AAA</option>
        <option value="123">BBB</option>
        <option value="123">CCC</option>
      </select>
      <button className="btn btn--primary">Add task</button>
    </form>
  );
};

export default TaskForm;
