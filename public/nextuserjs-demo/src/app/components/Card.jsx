// Card.jsx
import React from "react";

const Card = ({ logo, brandName }) => {
  return (
    <div className="flex items-center border rounded-2xl shadow-md p-4 w-full max-w-[400px] min-h-[180px] mx-auto bg-background">
      <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
        <img src={logo} alt={`${brandName} logo`} className="h-full w-full object-contain" />
      </div>
   
      <div className="flex-1 ml-8 flex flex-col justify-center">
        <h3 className="text-lg font-titles font-semibold text-center">{brandName}</h3>
        <button className="mt-4 bg-secondary hover:bg-secondary text-title hover:text-secondary font-info py-2 px-6 rounded-lg mx-auto">
          Ver productos
        </button>
      </div>
    </div>
  );
};

export default Card;
