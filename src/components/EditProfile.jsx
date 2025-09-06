import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { toast } from "react-toastify";
import { genericErrorMessage } from "../utils/common";
import { errorToastStyles, successToastStyles } from "../utils/toastStyles";
import axiosInstance from "../config/axiosInstance";
import { setUserDetails } from "../redux/slices/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const userId = useSelector((state) => state?.user?.userId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setDob(user.dob ?? "");
      setGender(user.gender ?? "");
      setAbout(user.about ?? "");
      setImageUrl(user.imageUrl ?? "");
      setSkills(user.skills ?? []);
    }
  }, [user]);
  const genderOptions = [
    {
      name: "Male",
      value: "male",
    },
    {
      name: "Female",
      value: "female",
    },
    {
      name: "Other",
      value: "other",
    },
  ];

  const saveProfile = async () => {
    const payload = {
      userId,
      firstName,
      lastName,
      gender,
      dob,
      about,
      imageUrl,
      skills,
    };
    try {
      const res = await axiosInstance.patch("/updateUserProfile", payload);
      const userDetails = res?.data?.data?.user;
      toast(res?.data?.message, successToastStyles);
      dispatch(setUserDetails(userDetails));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    }
  };

  return (
    <div className="flex justify-center my-18 gap-10">
      <div className="flex justify-center items-center">
        <div className="card bg-base-300 w-[650px] shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="px-4">
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

            <div className="px-4">
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

            <div className="px-4">
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

            <div className="px-4">
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

            <div className="px-4">
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

            <div className="px-4">
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
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard
        user={{ about, dateOfBirth: dob, firstName, lastName, gender, imageUrl, skills }}
        isEditProfile
      />
    </div>
  );
};

export default EditProfile;
