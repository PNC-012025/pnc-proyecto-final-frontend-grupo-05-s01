"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";

const InfoRow = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 text-foreground font-info mb-2">
    <Icon />
    <p className="text-sm">{label}</p>
  </div>
);

const Entrepeneurcard = ({
  id,
  logo,
  brandName,
  responsible,
  carnet,
  career,
  onClick,
}) => {
  const router = useRouter();

  const handleViewProfile = (e) => {
    e.stopPropagation();
    router.push(`/entrepreneurprofile/${id}`);
  };

  const handleViewTalonario = (e) => {
    e.stopPropagation();
    router.push(`/talonarios/${id}`);
  };

  return (
    <div
      onClick={onClick}
      className="border rounded-xl p-4 bg-card border-border-card shadow-md flex flex-row w-full max-w-lg mx-auto items-center duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="w-1/3 flex justify-center">
        <img
          src={logo}
          alt="Brand Logo"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div className="w-2/3 flex flex-col justify-between pl-4">
        <div>
          <h2 className="text-xl font-titles font-bold text-title mb-2">
            {brandName}
          </h2>
          <InfoRow icon={FaUserCircle} label={`Responsable: ${responsible}`} />
          <InfoRow icon={HiIdentification} label={`Carnet: ${carnet}`} />
          <InfoRow icon={GiGraduateCap} label={`Carrera: ${career}`} />
        </div>
        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={handleViewProfile}
            className="bg-secondary text-title font-info px-3 py-1 rounded-lg hover:bg-title hover:text-background transition text-sm"
          >
            VER MÁS
          </button>
          <button
            onClick={handleViewTalonario}
            className="bg-primary text-white font-info px-3 py-1 rounded-lg hover:bg-secondary hover:text-title transition text-sm"
          >
            TALONARIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entrepeneurcard;