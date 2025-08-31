import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      return;
    }
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center my-auto h-screen">
      <div className="card bg-base-300 w-[900px] py-4 shadow-sm">
        <div className="card-body">
          <h4 className="text-center text-2xl">
            Sorry, the page your're looking for does not exist or has been moved
            <br />
            Please go back to the Home page
          </h4>

          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleHomeRedirect}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
