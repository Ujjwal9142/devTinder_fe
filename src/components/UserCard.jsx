import React, { useState } from "react";
import { genericErrorMessage, getAge } from "../utils/common";
import axiosInstance from "../config/axiosInstance";
import { errorToastStyles, successToastStyles } from "../utils/toastStyles";
import { toast } from "react-toastify";
import GlobalLoader from "../utils/GlobalLoader";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/slices/feedSlice";

const UserCard = ({ user, isEditProfile = false }) => {
  const { about, dateOfBirth, firstName, lastName, gender, imageUrl, skills } = user;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(`/request/send/${status}/${userId}`);
      toast(res?.data?.message, successToastStyles);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={imageUrl ? imageUrl : null} alt="user" className="h-72 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <h4>
          {getAge(dateOfBirth)}, <span className="capitalize">{gender}</span>
        </h4>
        <p>{about}</p>
        {!isEditProfile && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSendRequest("ignored", user?._id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleSendRequest("interested", user?._id);
              }}
            >
              Interested
            </button>
          </div>
        )}
      </div>
      <GlobalLoader isLoading={isLoading} />
    </div>
  );
};

export default UserCard;
