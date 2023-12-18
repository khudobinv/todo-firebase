import React from "react";

export const IconButton = ({ icon, onClick }) => {
  return (
    <button className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700" onClick={onClick}>
      {icon}
    </button>
  );
};
