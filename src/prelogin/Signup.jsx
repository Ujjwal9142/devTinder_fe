import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorToastStyles, successToastStyles } from "../utils/toastStyles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { genericErrorMessage } from "../utils/common";
import { genderOptions } from "../utils/common";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(genderOptions[0].value);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenPresent();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName,
        lastName,
        password,
        confirmPassword,
        gender,
        email,
        dob,
        about,
        imageUrl,
      };
      const res = await axiosInstance.post("/signup", payload);
      toast(res?.data?.message, successToastStyles);
      navigate("/");
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
      <div className="flex justify-center items-center my-10 mb-20">
        <div className="card bg-base-300 sm:w-[700px] w-11/12 shadow-sm">
          <div className="card-body px-6">
            <h2 className="card-title justify-center">Sign Up</h2>
            <div>
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

            <div>
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

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Confirm Password</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue="Pick a browser"
                  className="select w-full outline-none focus:outline-none focus:ring-0"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genderOptions?.map((item) => {
                    return (
                      <option value={item?.value} key={item?.value}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">DOB</legend>
                <input
                  type="date"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input outline-none focus:outline-none focus:ring-0 w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="card-actions justify-center mt-3">
              <button className="btn btn-primary" onClick={(e) => handleSignup(e)}>
                Sign Up
              </button>
            </div>
            <p className=" mt-4 font-semibold">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
