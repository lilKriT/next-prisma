"use client";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const url = "http://localhost:3000";

const TaskCard = ({ task }: { task: Task }) => {
  const router = useRouter();

  const deleteTask = async () => {
    console.log(`Deleting ${task.id}`);

    try {
      const res = await fetch(`${url}/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="taskCard">
      <h2>{task.title}</h2>
      <button onClick={deleteTask} className="btn btn--danger btn--small">
        <AiFillDelete />
      </button>
    </div>
  );
};

export default TaskCard;
