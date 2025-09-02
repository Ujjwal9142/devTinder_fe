import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserId, setUserDetails } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import Feed from "./Feed";
import { genericErrorMessage } from "../utils/common";

const Home = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/getUserProfile");
      const userDetails = res?.data?.data?.user;
      dispatch(setUserDetails(userDetails));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
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
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

export default Home;
