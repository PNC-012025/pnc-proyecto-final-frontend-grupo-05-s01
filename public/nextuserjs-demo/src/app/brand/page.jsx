"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { apiFetch } from '@/lib/api'
import Spinner from "../components/Spinner";

const Page = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await apiFetch('/business-requests/approved-summary')
        setBrands(data)
      } catch (err) {
        setError(err.message || 'Error al cargar marcas')
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = brands.slice(startIdx, startIdx + itemsPerPage);

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
        {currentItems.map((brand) => (
          <Card 
          key={brand.id} 
          id={brand.id} 
          logo={brand.urlLogo ?? "/storeplace.jpg"} 
          brandName={brand.businessName}
          />
        ))}
      </div>

    {/* Paginación */}        
    <div className="flex justify-center mt-6 mb-8 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm font-info text-foreground">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Page;