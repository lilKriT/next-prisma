import { Metadata } from "next";
import UserProfile from "./UserProfile";

export const metadata: Metadata = {
  title: "Profile",
  description: "Log in to fully experience Get it Done!",
};

const Profile = () => {
  return (
    <div className="container">
      <UserProfile />
    </div>
  );
};

export default Profile;
