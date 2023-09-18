"use client";

import { useAuthContext } from "@/lib/context/provider";

const url = process.env.NEXT_PUBLIC_URL;

const UserProfile = () => {
  const { name, role } = useAuthContext();

  const fetchData = () => {
    const test = async () => {
      const res = await fetch(`${url}/api/users/refresh`);
      const data = await res.json();
      console.log("CS cookie test: ", data);
    };
    test();
  };
  // fetchData();
  // This has cookies, even without method and credentials set. However, doesn't work on server side!

  return (
    <>
      <h2>{role === "Admin" ? "Admin" : "User"} Profile</h2>
      <p>Hello. You are logged in as a {role}. This means you can: </p>
      {role === "Admin" ? (
        <ul>
          <li>Delete user accounts</li>
          <li>Create and assign tasks to others.</li>
        </ul>
      ) : (
        <ul>
          <li>Create and assing tasks to yourself</li>
          <li>{"View other's tasks."}</li>
        </ul>
      )}
    </>
  );
};

export default UserProfile;
