"use client";
import React, { useState, useEffect } from "react";
import Entrepeneurcard from "../components/Entrepeneurcard";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";

const Page = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");      
  const [filter2, setFilter2] = useState("");     
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 9;

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        queryParams.append("page", currentPage - 1); 
        queryParams.append("size", itemsPerPage);
        queryParams.append("sort", "businessName,asc");

        if (filter2) queryParams.append("statuses", filter2);
        if (filter === "true" || filter === "false") queryParams.append("tienenContrato", filter);
        queryParams.append("tienenProductosPendientes", "true");

        const endpoint = `/admin/business/approved?${queryParams.toString()}`;
        console.log("Fetching brands from:", endpoint);
        const data = await apiFetch(endpoint);

        setBrands(data.content); 
        setTotalPages(data.totalPages); 
      } catch (err) {
        setError(err.message || "Error al cargar los emprendimientos");
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, [filter, filter2, currentPage]);

  
  const filteredData = brands.filter(item =>
    item.businessName &&
    item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-titles text-title font-bold mb-6 mt-4">
        Revisa el estado de los emprendedores y sus talonarios
      </h1>

      <div className="mb-4 w-full flex flex-col items-center gap-4">
        {/* Search input */}
        <div className="relative w-full max-w-md text-foreground">
          <input
            type="text"
            placeholder="Buscar marcas"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-full px-4 py-2 pr-10 w-full shadow-md focus:outline-none focus:ring-0 text-foreground font-info"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground" />
        </div>
      </div>

      {/* Cards founds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {filteredData.map((brand) => (
          <Entrepeneurcard
            key={brand.id}
            id={brand.id}
            logo={brand.urlLogo ?? "/storeplace.jpg"}
            brandName={brand.businessName}
            responsible={brand.ownerFullName}
            carnet={brand.ownerEmail}
            career={brand.major}
            onClick={() => router.push(`/renewstock/${brand.id}`)}
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
