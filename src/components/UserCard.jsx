import React from "react";
import { getAge } from "../utils/common";

const UserCard = ({ user }) => {
  const { about, dateOfBirth, firstName, lastName, gender, imageUrl, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={imageUrl} alt="user" className="h-72 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>
          {getAge(dateOfBirth)}, <span className="capitalize">{gender}</span>
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
