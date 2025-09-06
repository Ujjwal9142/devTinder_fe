import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div>
      <EditProfile />
    </div>
  );
};

export default Profile;
