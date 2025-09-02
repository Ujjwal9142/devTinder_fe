import React, { useEffect } from "react";
import { errorToastStyles } from "../utils/toastStyles";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../redux/slices/feedSlice";
import UserCard from "../components/UserCard";
import { genericErrorMessage } from "../utils/common";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state?.feed?.feed);

  const getUserFeed = async () => {
    const payload = {
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const res = await axiosInstance.post("/user/feed", payload);
      dispatch(addUserFeed(res?.data?.data?.users || []));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    }
  };

  useEffect(() => {
    if (userFeed?.length === 0) {
      getUserFeed();
    }
  }, []);

  return (
    userFeed?.length > 0 && (
      <div className="flex justify-center my-10">
        <UserCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
