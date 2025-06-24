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

const Entrepeneurcard = ({ id, logo, brandName, responsible, carnet, career }) => {
  const router = useRouter();

  const handleViewContract = () => {
  router.push(`/entrepreneurprofile/${id}`);
};

  return (
    <div className="border rounded-xl p-4 bg-card border-border-card shadow-md flex flex-row w-full max-w-lg mx-auto items-center duration-300 hover:scale-105 hover:shadow-xl">
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
        <button
          onClick={handleViewContract}
          className="mt-4 bg-secondary text-title font-info px-4 py-1 rounded-lg self-end hover:bg-title hover:text-background transition text-sm"
        >
          VER MÁS
        </button>
      </div>
    </div>
  );
};

export default Entrepeneurcard;
