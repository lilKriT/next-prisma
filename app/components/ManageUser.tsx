"use client";

import { useAuthContext } from "@/lib/context/provider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const url = process.env.NEXT_PUBLIC_URL;

const ManageUser = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const { id, role } = useAuthContext();
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    setCanDelete(false);
    if (role === "Admin" || (role === "User" && id && +id === userId)) {
      setCanDelete(true);
    }
  }, [id, role]);

  const deleteUser = async () => {
    try {
      await fetch(`${url}/api/users/close/${userId}`, {
        method: "DELETE",
      });

      //   const json = await res.json();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {canDelete && (
        <button onClick={deleteUser} className="btn btn--small btn--danger">
          <AiFillDelete />
        </button>
      )}
    </div>
  );
};

export default ManageUser;
