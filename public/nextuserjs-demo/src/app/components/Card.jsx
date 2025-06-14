import React from "react";
import { useRouter } from "next/navigation";

const Card = ({ id, logo, brandName }) => {
  const router = useRouter();

  const handleViewProducts = () => {
    router.push(`/brandproducts/${id}`); 
  };

  return (
    <div className="flex items-center border rounded-2xl border-border-card shadow-xl p-4 w-full max-w-[400px] min-h-[180px] mx-auto bg-card">
      <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-card">
        <img src={logo} alt={`${brandName} logo`} className="h-full w-full object-contain" />
      </div>
      <div className="flex-1 ml-8 flex flex-col justify-center">
        <h3 className="text-lg font-titles font-semibold text-center">{brandName}</h3>
        <button
          onClick={handleViewProducts} 
          className="mt-4 bg-secondary hover:bg-title text-title hover:text-background font-info py-2 px-6 rounded-lg mx-auto text-sm cursor-pointer"
        >
          Ver productos
        </button>
      </div>
    </div>
  );
};

export default Card;
