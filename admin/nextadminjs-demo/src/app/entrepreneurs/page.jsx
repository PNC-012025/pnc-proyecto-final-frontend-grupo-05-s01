"use client";
import React, { useState } from "react";
import Entrepeneurcard from "../components/Entrepeneurcard";
import { FaSearch } from "react-icons/fa";

const data = [
  {
    id: 1,
    logo: "/logo.png", 
    brandName: "Sucrée",
    responsible: "Jose Carlos Pérez Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
  {
    id: 2,
    logo: "/logo.png",
    brandName: "Narcisa",
    responsible: "Jose Carlos Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
  {
    id: 3,
    logo: "/logo.png",
    brandName: "pao",
    responsible: "Jose Carlos Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
  {
    id: 4,
    logo: "/logo.png",
    brandName: "jesus",
    responsible: "Jose Carlos Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
  {
    id: 5,
    logo: "/logo.png",
    brandName: "francisco",
    responsible: "Jose Carlos Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
  {
    id: 6,
    logo: "/logo.png",
    brandName: "pao perez perez",
    responsible: "Jose Carlos Pérez",
    carnet: "002004",
    contact: "jsucre@uca.edu.sv",
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-titles text-title font-bold mb-6 mt-4">
        Revisa el estado de los emprendedores y sus talonarios
      </h1>

      {/* Searh bar: it filters for brand name */}
      <div className="relative max-w-md text-foreground mx-auto mb-6">
        <input
          type="text"
          placeholder="Buscar marcas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-full px-4 py-2 pr-10 w-full shadow-md focus:outline-none focus:ring-0 text-foreground font-info"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground" />
      </div>

      {/* Cards founds*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <Entrepeneurcard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
