import React from "react";
import Navbar from "../components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";

const Home = () => {
  return (
    <div>
      <Navbar />
      {!localStorage.getItem("token") ? (
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </div>
  );
};

export default Home;
