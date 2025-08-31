import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserId, setUserDetails } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/getUserProfile");
      const userDetails = res?.data?.data?.user;
      dispatch(setUserDetails(userDetails));
    } catch (err) {
      console.error(err, "error");
    }
  };

  const setUserIdToRedux = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedInfo = jwtDecode(token);
      dispatch(setUserId(decodedInfo?.id));
    }
  };

  useEffect(() => {
    setUserIdToRedux();
    fetchUserDetails();
  }, []);

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
