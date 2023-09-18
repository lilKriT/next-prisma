"use client";
import { useAuthContext } from "@/lib/context/provider";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const url = "http://localhost:3000";

const TaskCard = ({ task }: { task: Task }) => {
  const router = useRouter();
  const { id, role } = useAuthContext();

  const deleteTask = async () => {
    console.log(`Deleting ${task.id}`);

    try {
      const res = await fetch(`${url}/api/tasks/${task.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer bla bla",
        },
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const canDelete = () => {
    if (role === "Admin") {
      return true;
    }
    if (id && task.userId === +id) {
      return true;
    }
    return false;
  };

  return (
    <div className="taskCard">
      <h2>{task.title}</h2>
      {canDelete() && (
        <button onClick={deleteTask} className="btn btn--danger btn--small">
          <AiFillDelete />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
