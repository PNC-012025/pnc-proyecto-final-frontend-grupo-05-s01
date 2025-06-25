"use client";
import React, { useState, useEffect } from "react";
import Entrepeneurcard from "../components/Entrepeneurcard";
import { FaSearch } from "react-icons/fa";
import { apiFetch } from '@/lib/api'

const Page = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await apiFetch('/admin/business/approved');
        setBrands(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los emprendimientos');
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

 const filteredData = brands.filter(
  (item) =>
    item.businessName &&
    item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
);

if (loading) return <p>Cargando marcas aprobadas...</p>
if (error) return <p className="text-red-500">{error}</p>


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
        {filteredData.map((brand) => (
          <Entrepeneurcard 
          key={brand.id} 
          id={brand.id} 
          logo={brand.urlLogo}
          brandName={brand.businessName}
          responsible={brand.ownerFullName}
          carnet={brand.ownerEmail}
          career={brand.major}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;