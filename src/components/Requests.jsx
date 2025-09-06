import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { addRequests } from "../redux/slices/requestSlice";
import { toast } from "react-toastify";
import { genericErrorMessage, getAge } from "../utils/common";
import { errorToastStyles, successToastStyles } from "../utils/toastStyles";
import GlobalLoader from "../utils/GlobalLoader";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state?.requests?.requests);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user/requests/recieved");
      dispatch(addRequests(res?.data?.data?.connectionRequests));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    } finally {
      setIsLoading(false);
    }
  };

  const reviewRequest = async (status, requestId) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(`/request/review/${status}/${requestId}`);
      toast(res?.data?.message, successToastStyles);
      fetchRequests();
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="text-center justify-center my-10">
      <h1 className="font-bold text-3xl">Requests</h1>
      {requests?.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-5">
          {requests?.map((item) => {
            const { firstName, lastName, dateOfBirth, gender, imageUrl, about } = item?.fromUserId;
            return (
              <div
                className="flex justify-between items-center m-4 p-4 bg-base-300 rounded-lg w-1/2"
                key={item?._id}
              >
                <div className="flex items-center">
                  <img src={imageUrl} alt="user" className="w-20 h-20 rounded-full" />
                  <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                    {dateOfBirth && gender && <p>{`${getAge(dateOfBirth)}, ${gender}`}</p>}
                    <p>{about}</p>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      reviewRequest("rejected", item?._id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() => {
                      reviewRequest("accepted", item?._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : !isLoading ? (
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h2 className="text-2xl">No pending connection requests!</h2>
        </div>
      ) : (
        ""
      )}
      <GlobalLoader isLoading={isLoading} />
    </div>
  );
};

export default Requests;
