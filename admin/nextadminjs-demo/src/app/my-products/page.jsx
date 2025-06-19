// app/myprofile/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProducts = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{profileData?.brandName || "LE CROISSANT"}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {profileData?.description || "Somos una marca que vende los mejores productos en panadería francesa."}
          </p>
        </div>

        {/* Catálogo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CATÁLOGO</h2>
          <p className="text-gray-600 mb-8 text-center">
            {profileData?.catalogDescription || "Lorem ipsum dolor sit amet consectetur adipiscing elit."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData?.products?.map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-500">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
};

export default MyProducts;