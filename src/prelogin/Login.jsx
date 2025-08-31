import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    handleTokenPresent();
  }, []);

  const handleLogin = async () => {
    try {
      const payload = {
        email,
        password,
      };
      const res = await axiosInstance.post("/login", payload);
      const token = res?.data?.data?.token;
      localStorage.setItem("token", token);
      const decodedInfo = jwtDecode(token);
      dispatch(loginUser(decodedInfo?.id));
      navigate("/home");
    } catch (err) {
      console.error(err, "error");
    }
  };

  const handleTokenPresent = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="px-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input outline-none focus:outline-none focus:ring-0"
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
                className="input outline-none focus:outline-none focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
