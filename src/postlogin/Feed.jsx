import React, { useEffect, useState } from "react";
import { errorToastStyles } from "../utils/toastStyles";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../redux/slices/feedSlice";
import UserCard from "../components/UserCard";
import { genericErrorMessage } from "../utils/common";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state?.feed?.feed);
  const [hasMore, setHasMore] = useState(true);

  const getUserFeed = async () => {
    const payload = {
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const res = await axiosInstance.post("/user/feed", payload);
      const usersData = res?.data?.data?.users || [];
      dispatch(addUserFeed(usersData));
      if (usersData?.length <= 0) {
        setHasMore(false);
      }
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    }
  };

  useEffect(() => {
    if (userFeed?.length === 0 && hasMore) {
      getUserFeed();
    }
  }, [userFeed]);

  return userFeed?.length > 0 ? (
    <div className="flex justify-center my-10">
      <UserCard user={userFeed[0]} />
    </div>
  ) : (
    <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <h2 className="text-2xl">No new users found!</h2>
    </div>
  );
};

export default Feed;
