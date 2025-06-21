"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import CardProd from "../../components/Cardprod";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { apiFetch } from '@/lib/api';

const BrandPage = () => {
  const { id } = useParams(); // Se envia el id  para que cargue los products de esa brand
  const [brandInfo, setBrandInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchBrandInfo() {
      try {
        const data = await apiFetch(`/products/business/${id}/approved`);
        setBrandInfo(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos del negocio');
      } finally {
        setLoading(false);
      }
    }

    fetchBrandInfo();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!brandInfo) return null;

  return (
    <div className="px-4 lg:px-8 py-10 bg-background">
      {/* Encabezado de negocio */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl text-title font-titles font-semibold uppercase">
            {brandInfo.businessName}
          </h1>
          <p className="text-foreground mt-4 font-info leading-relaxed">{brandInfo.description}</p>
          <div className="flex justify-center lg:justify-start mt-6 gap-6 text-2xl">
            <a
              href={brandInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-title transition-transform"
            >
              <FaFacebook />
            </a>
            <a
              href={brandInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-title transition-transform"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 px-4 lg:px-8">
          <img
            src={brandInfo.urlLogo}
            alt={brandInfo.businessName}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Lista de productos */}
      <h2 className="text-center font-titles text-title text-2xl font-bold mt-10 mb-4 uppercase tracking-wide">
        CATÁLOGO
      </h2>
      <p className="max-w-5xl mx-auto mb-10 px-1 text-center lg:text-justify leading-relaxed text-foreground">
        Descubre nuestra exclusiva colección de productos seleccionados cuidadosamente para ofrecerte la mejor calidad y diseño.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {brandInfo.approvedProducts.map((product) => (
          <CardProd
            key={product.id}
            image={product.urlImage}
            productName={product.name}
            productPrice={`$${product.price.price}`}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
