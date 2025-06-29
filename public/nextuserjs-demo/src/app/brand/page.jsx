"use client";

import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";

const Page = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 12; // Puedes ajustar si quieres otro tamaño

  const fetchBrands = async (page = 0, searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      let url = `/business-requests/approved-summary?page=${page}&size=${itemsPerPage}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const data = await apiFetch(url);
      setBrands(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Error al cargar marcas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(currentPage, search);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchBrands(0, search);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="w-full">
        <img
          src="/mercatnight.jpg"
          alt="Mercaduca open at night"
          className="w-full max-h-[520px] h-auto object-cover"
        />
      </div>

      <form
        onSubmit={handleSearch}
        className="flex justify-center mt-6 mb-4 space-x-2"
      >
        <input
          type="text"
          placeholder="Buscar marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-64 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm"
        >
          Buscar
        </button>
      </form>

      <h2 className="text-center font-titles text-title text-xl font-bold mt-4 mb-8">
        MARCAS PARTICIPANTES:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-16">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <Card
              key={brand.id}
              id={brand.id}
              logo={brand.urlLogo ?? "/storeplace.jpg"}
              brandName={brand.businessName}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No se encontraron marcas.</p>
        )}
      </div>

      <div className="flex justify-center mt-6 mb-8 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm font-info text-foreground">
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 bg-secondary text-title rounded hover:bg-title hover:text-background transition text-sm disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Page;
