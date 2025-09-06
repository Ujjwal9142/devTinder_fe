import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import { genericErrorMessage, getAge } from "../utils/common";
import { errorToastStyles } from "../utils/toastStyles";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";
import GlobalLoader from "../utils/GlobalLoader";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state?.connections?.connections);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user/connections");
      dispatch(addConnections(res?.data?.data?.connections));
    } catch (err) {
      toast(err?.response?.data?.message || genericErrorMessage, errorToastStyles);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="text-center justify-center my-10">
      <h1 className="font-bold text-3xl">Connections</h1>
      {isLoading ? (
        <GlobalLoader isLoading={isLoading} />
      ) : connections?.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-5">
          {connections?.map((item) => {
            const { firstName, lastName, dateOfBirth, gender, imageUrl, about } = item;
            return (
              <div className="flex m-4 p-4 bg-base-300 rounded-lg w-1/3">
                <div>
                  <img src={imageUrl} alt="user" className="w-20 h-20 rounded-full" />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                  {dateOfBirth && gender && <p>{`${getAge(dateOfBirth)}, ${gender}`}</p>}
                  <p>{about}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center inset-0 fixed">
          <h2 className="text-2xl">No connections yet!</h2>
        </div>
      )}
    </div>
  );
};

export default Connections;
