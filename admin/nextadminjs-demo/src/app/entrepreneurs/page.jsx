"use client";
import React, { useState, useEffect } from "react";
import Entrepeneurcard from "../components/Entrepeneurcard";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { apiFetch } from '@/lib/api'

const Page = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const startIdx = (currentPage - 1) * itemsPerPage;
const currentItems = filteredData.slice(startIdx, startIdx + itemsPerPage);

if (loading) return <p>Cargando marcas aprobadas...</p>
if (error) return <p className="text-red-500">{error}</p>


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-titles text-title font-bold mb-6 mt-4">
        Revisa el estado de los emprendedores y sus talonarios
      </h1>

    
      {/* Searh bar: it filters for brand name */}
      <div className="relative mb-4">
       <div className="mx-auto w-full max-w-md relative text-foreground">
        <input
          type="text"
          placeholder="Buscar marcas"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-full px-4 py-2 pr-10 w-full max-w-md shadow-md focus:outline-none focus:ring-0 text-foreground font-info"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground" />
      </div>

      {/* Filter dropdown */}
   <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-28">
    <select
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
         setCurrentPage(1);
      }}
      className="appearance-none border rounded-full pl-3 pr-8 py-2 w-full shadow-md focus:outline-none focus:ring-0 text-foreground font-info"
    >
      <option value="">Todos</option>
      <option value="Ingeniería Informática">Ingeniería Informática</option>
      <option value="Carrera 2">Carrera 2</option>
      <option value="Carrera 12">Carrera 12</option>
    </select>
    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2" />
  </div>
</div>
   
    

      {/* Cards founds*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {currentItems.map((brand) => (
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

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm"
        >
          Anterior
        </button>
        <span className="text-sm font-info text-foreground">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Page;