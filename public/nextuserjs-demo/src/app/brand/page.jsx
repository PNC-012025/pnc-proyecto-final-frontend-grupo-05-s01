"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Page = () => {
  // Arreglo quemado para probar que las cards se agreguen dinamicamente 
  const [brands, setBrands] = useState([
    { id: 1, logo: "/logo.png", brandName: "Sucrée" },
    { id: 2, logo: "/uca.jpg", brandName: "Calvin Klein" },
    { id: 3, logo: "/logo.png", brandName: "McDonald's" },
    { id: 4, logo: "/logo.png", brandName: "Versace" },
    { id: 5, logo: "/logo.png", brandName: "Hyundai" },
    { id: 6, logo: "/logo.png", brandName: "Le Croissant" },
    { id: 7, logo: "/logo.png", brandName: "Hello" },
    { id: 8, logo: "/logo.png", brandName: "UCA" },
    { id: 9, logo: "/logo.png", brandName: "pizza hut" },
    { id: 10, logo: "/logo.png", brandName: "pollo campero" },
    { id: 11, logo: "/logo.png", brandName: "starbucks" },
    { id: 12, logo: "/logo.png", brandName: "starbucks" },
    { id: 13, logo: "/logo.png", brandName: "Mercaduca" },
]);

  return (
    <div>
        <div className="w-full">
          <img
            src="/mercatnight.jpg"
            alt="Mercaduca open at night"
            className="w-full max-h-[520px] h-auto object-cover"
          />
        </div>
      
    {/* Seccion de tarjetas de brands */}
       <h2 className="text-center font-titles text-title text-xl font-bold mt-6 mb-8">
        MARCAS PARTICIPANTES:
      </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-16">
        {brands.map((brand) => (
          <Card key={brand.id} logo={brand.logo} brandName={brand.brandName} />
        ))}
      </div>
    </div>

  );
};

export default Page;
