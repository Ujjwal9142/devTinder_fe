import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const GlobalLoader = ({ isLoading = true, size = 60, color = "#2563eb" }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <ClipLoader loading={isLoading} size={size} color={color} />
    </div>
  );
};

export default GlobalLoader;
