import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorToastStyles } from "../utils/toastStyles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const genericErrorMessage = "Something went wrong";

  useEffect(() => {
    handleTokenPresent();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email,
        password,
      };
      const res = await axiosInstance.post("/login", payload);
      const token = res?.data?.data?.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    }
  };

  const handleTokenPresent = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center my-28">
        <div className="card bg-base-300 w-[500px] shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="px-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="px-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="card-actions justify-center mt-3">
              <button className="btn btn-primary" onClick={(e) => handleLogin(e)}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
