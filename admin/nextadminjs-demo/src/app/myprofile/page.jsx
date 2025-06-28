"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";

const MyProfile = () => {
  const router = useRouter();
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const data = await apiFetch("/business/profile");
        setBusinessData(data);
      } catch (err) {
        console.error("Error al cargar perfil del negocio:", err);
        setError("No se pudo cargar el perfil del negocio.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, []);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );

  if (!businessData)
    return (
      <div className="text-center mt-10">
        Perfil del negocio no disponible.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold font-titles text-foreground mb-6 text-center">MI PERFIL</h1>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={businessData.urlLogo || "/user-default.png"}
                  alt="Logo del negocio"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-titles font-semibold text-foreground uppercase">
                {businessData.businessName || "Nombre de Marca"}
              </h2>
            </div>
            <button
              onClick={handleEditProfile}
              className="bg-secondary text-title px-4 py-2 rounded-md hover:bg-title transition hover:text-background"
            >
              EDITAR PERFIL
            </button>
          </div>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Mi información comercial
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-foreground font-semibold">Sector:</p>
                <p className="font-medium">{businessData.sector}</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Número de teléfono:</p>
                <p className="font-medium">+503 {businessData.phone}</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Rango de precios:</p>
                <p className="font-medium">{businessData.priceRange}</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Tipo de producto:</p>
                <p className="font-medium">{businessData.productType}</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Facebook:</p>
                <p className="font-medium">{businessData.facebook}</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Instagram:</p>
                <p className="font-medium">{businessData.instagram}</p>
              </div>
            </div>

            <div>
              <p className="text-foreground font-semibold">Descripción marca:</p>
              <p className="font-medium">{businessData.description}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
