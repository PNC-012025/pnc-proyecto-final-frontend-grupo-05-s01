"use client";

import React, { useState, useEffect } from "react";
import CardProd from "../components/Cardprod";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";

const MyProducts = () => {
  const [brandInfo, setBrandInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusinessAndProducts = async () => {
      try {
        const profile = await apiFetch("/business/profile");
        const businessId = profile.id;

        const data = await apiFetch(`/products/business/${businessId}/approved`);

        
        setBrandInfo({
          name: data.businessName || "Mi Emprendimiento",
          description: data.description || "Sin descripción",
          logo: data.urlLogo || "/user-default.png",
          socialLinks: {
            facebook: data.facebook || "#",
            instagram: data.instagram || "#",
          },
        });

        const formattedProducts = (data.approvedProducts || []).map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          image: p.urlImage,
          price: p.price?.price ?? 0,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar los productos o el perfil del negocio.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessAndProducts();
  }, []);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );

  if (!brandInfo)
    return (
      <p className="text-center mt-20">
        No se encontró información del negocio.
      </p>
    );

  return (
    <div className="px-4 lg:px-8 py-10 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl text-title font-titles font-semibold uppercase">
            {brandInfo.name}
          </h1>
          <p className="text-foreground mt-4 font-info leading-relaxed">{brandInfo.description}</p>
          <div className="flex justify-center lg:justify-start mt-6 gap-6 text-2xl">
            <a href={brandInfo.socialLinks.facebook} target="_blank" className="text-foreground hover:text-title transition-transform">
              <FaFacebook />
            </a>
            <a href={brandInfo.socialLinks.instagram} target="_blank" className="text-foreground hover:text-title transition-transform">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 px-4 lg:px-8">
          <img src={brandInfo.logo} alt={brandInfo.name} className="h-full w-full object-contain" />
        </div>
      </div>

      <h2 className="text-center font-titles text-title text-2xl font-bold mt-10 mb-4 uppercase tracking-wide">
        CATÁLOGO
      </h2>
      <p className="max-w-5xl mx-auto mb-10 px-1 text-center lg:text-justify leading-relaxed text-foreground">
        Descubre nuestra exclusiva colección de productos seleccionados cuidadosamente para ofrecerte la mejor calidad y diseño...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <CardProd
              key={product.id}
              image={product.image}
              productName={product.name}
              productPrice={`$${product.price}`}
              description={product.description}
              linkTo={`/products-restock/${product.id}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay productos aprobados aún.</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
