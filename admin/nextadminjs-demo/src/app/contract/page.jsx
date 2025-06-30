"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";

const ContractView = () => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
        setLoading(true); 
      try {
        const data = await apiFetch("/contract/me");
        setContract(data);
      } catch (err) {
        console.error("Error al cargar contrato:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, []);

  if (loading) return <Spinner />;
  if (error)   return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!contract) return <p className="text-center mt-20">Producto no encontrado.</p>;


  return (
    <div className="min-h-screen bg-background py-10 px-4 flex justify-center">
      <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full p-6">
        <h1 className="text-center text-title font-titles md:text-2xl mb-8">
          Contrato de Alquiler de Puesto en Mercaduca
        </h1>

        <div className="mb-6 font-info">
          <h2 className="font-semibold mb-2 font-info text-title">Información del cliente:</h2>
          <p className="mb-2 text-foreground font-info">
            <strong>Emprendimiento:</strong> {contract.businessName}
          </p>
          <p className="mb-2 text-foreground font-info">
            <strong>Dueño:</strong> {contract.ownerName} {contract.ownerLastName}
          </p>
          <p className="mb-2 text-foreground font-info">
            <strong>Correo electrónico:</strong> {contract.ownerMail}
          </p>
          <p className="mb-2 text-foreground font-info">
            <strong>Número de teléfono:</strong> +503 {contract.phone}
          </p>
        </div>

        <div className="mb-6 font-info">
          <h2 className="font-semibold font-info mb-2 text-title">Duración del contrato:</h2>
          <p className="mb-2 font-info text-foreground">
            De acuerdo a las políticas de Mercaduca, el período de participación en el local emprendedor es de tres meses
          </p>
          <p className="mb-2 font-info text-foreground">
            <strong>Estado actual:</strong> {contract.status || "Pendiente"}
          </p>
          <p className="mb-2 font-info text-foreground">
            <strong>Fecha de inicio:</strong> {contract.startDate || "DD/MM/YY"}
          </p>
          <p className="mb-2 font-info text-foreground">
            <strong>Fecha de fin:</strong> {contract.endDate || "DD/MM/YY"}
          </p>
        </div>

        <div className="mb-6 font-info">
          <h2 className="font-semibold text-title mb-2">Monto y forma de pago:</h2>
          <p className="font-info text-foreground mb-2">
            <strong>Frecuencia de pago:</strong> {contract.kindOfPayment}
          </p>
          <p className="text-foreground mb-2">
            <strong>Método de pago:</strong> {contract.paymentMethod}
          </p>
        </div>

        <div className="mb-6 font-info">
          <h2 className="font-semibold font-info text-title mb-2">Causales de terminación:</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm font-info text-foreground">
            <li>El emprendedor/a incumple las políticas establecidas.</li>
            <li>El emprendedor presenta mala actitud ante los miembros del Centro de Orientación Profesional y/o personal de Mercaduca durante su estancia en el local emprendedor.</li>
            <li>El emprendedor no cumple con los pagos de alquiler en las fechas establecidas anteriormente.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ContractView;
