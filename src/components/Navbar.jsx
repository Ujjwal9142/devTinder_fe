import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { removeConnections } from "../redux/slices/connectionSlice";
import { removeFeed } from "../redux/slices/feedSlice";
import { removeRequests } from "../redux/slices/requestSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultImageUrl = "https://geographyandyou.com/images/user-profile.png";
  const userInfo = useSelector((state) => state?.user?.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(removeConnections());
    dispatch(removeFeed());
    dispatch(removeRequests());
    navigate("/");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl">
          👩‍💻Meet&Greet
        </Link>
      </div>
      {localStorage.getItem("token") && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-3.5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user" src={userInfo ? userInfo?.imageUrl : defaultImageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/home/profile"
                  className="justify-between"
                  onClick={() => document.activeElement.blur()}
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/home/connections"
                  className="justify-between"
                  onClick={() => document.activeElement.blur()}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/home/requests"
                  className="justify-between"
                  onClick={() => document.activeElement.blur()}
                >
                  Requests
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
