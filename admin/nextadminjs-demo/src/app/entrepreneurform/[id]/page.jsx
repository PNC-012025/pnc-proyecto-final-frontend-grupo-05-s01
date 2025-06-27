"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function EntrepreneurFormView() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchEntrepreneur = async () => {
      try {
        const response = await apiFetch(`/business-requests/${id}`);
        setData(response);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchEntrepreneur();
  }, [id]);

  if (!data) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <main className="bg-background min-h-screen flex justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl border border-gray-200 space-y-6">
        <h1 className="text-3xl font-bold text-center text-title">Formulario de registro</h1>
        <p className="text-center text-sm text-foreground">
          El siguiente formulario ha sido completado por un nuevo emprendedor, conoce más de su marca
        </p>
        <p className="text-center text-sm text-foreground">
          Recuerda revisar cuidadosamente cada uno de los campos. Si todo está correcto, puedes aprobarlo para que se muestre en la sección de emprendedores. Si no, puedes rechazarlo y dejar un comentario para el emprendedor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm font-info">
          <p><strong>Nombre:</strong> {data.userName}</p>
          <p><strong>Apellido:</strong> {data.userLastName}</p>
          <p><strong>Sexo:</strong> {data.userGender}</p>
          <p><strong>Fecha de nacimiento:</strong> {data.submissionDate}</p>
          <p><strong>Tipo de emprendedor:</strong> {data.entrepeneurKind}</p>
          <p><strong>Carnet UCA:</strong> {data.userEmail}</p>
          <p><strong>Facultad:</strong> {data.faculty}</p>
          <p><strong>Carrera:</strong> {data.sector}</p>
        </div>

        <div className="space-y-2 text-sm font-info">
          <p><strong>Nombre del emprendimiento:</strong> {data.businessName}</p>
          <p><strong>Descripción:</strong> {data.description}</p>
          <p><strong>Sector:</strong> {data.sector}</p>
          <p><strong>Productos:</strong> {data.productType}</p>
          <p><strong>Rango de precios:</strong> {data.priceRange}</p>
          <p><strong>Facebook:</strong> {data.facebook}</p>
          <p><strong>Instagram:</strong> {data.instagram}</p>
          <p><strong>Teléfono:</strong> {data.phone}</p>
        </div>

        {data.urlLogo && (
          <div>
            <p className="font-bold text-sm">Logo del emprendimiento:</p>
            <img src={data.urlLogo} alt="Logo" className="w-32 h-32 object-contain border" />
          </div>
        )}
      </div>
    </main>
  );
}
