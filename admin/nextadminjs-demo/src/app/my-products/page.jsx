"use client";

import React, { useState, useEffect } from "react";
import CardProd from "../components/Cardprod";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const MyProducts = () => {
  const [brandInfo, setBrandInfo] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProfileAndProducts = async () => {
      try {
        const profileRes = await fetch("http://localhost:8080/api/business/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!profileRes.ok) throw new Error("Error al obtener perfil del emprendimiento");

        const profileData = await profileRes.json();
        setBrandInfo({
          name: profileData.name || "Mi Emprendimiento",
          description: profileData.description || "Sin descripción",
          logo: profileData.urlLogo || "/user-default.png",
          socialLinks: {
            facebook: profileData.facebook || "#",
            instagram: profileData.instagram || "#",
          },
        });

        const productsRes = await fetch(`http://localhost:8080/api/products/business/${profileData.id}/approved`, {
          method: "GET",
          credentials: "include",
        });

        if (!productsRes.ok) throw new Error("Error al obtener productos aprobados");

        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchProfileAndProducts();
  }, []);

  if (!brandInfo.name) return <p>Cargando...</p>;

  return (
    <div className="px-4 lg:px-8 py-10 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl text-title font-titles font-semibold uppercase">{brandInfo.name}</h1>
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
        Descubre nuestra exclusiva colección de productos seleccionados cuidadosamente para ofrecerte la mejor calidad y diseño. Cada artículo en nuestro catálogo refleja innovación y estilo, pensado para satisfacer tus necesidades y superar tus expectativas.
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
