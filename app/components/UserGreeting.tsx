"use client";

import { useAuthContext } from "@/lib/context/provider";
import React from "react";

const UserGreeting = () => {
  const { role } = useAuthContext();
  return (
    <div>
      <p>
        {role === "Admin"
          ? "Hello, admin."
          : role === "User"
          ? "Hello, user."
          : "Hello, guest."}
      </p>
    </div>
  );
};

export default UserGreeting;
