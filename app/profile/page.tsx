"use client";

import { useAuthContext } from "@/lib/context/provider";

const Profile = () => {
  const { name, role } = useAuthContext();
  return (
    <div className="container">
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
          <li>View other's tasks.</li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
