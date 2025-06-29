"use client";

import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { apiFetch } from "@/lib/api";
import Spinner from "../components/Spinner";

const MyPayments = () => {
  const [contract, setContract] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractData = await apiFetch("/contract/me");
        setContract(contractData);

        const paymentData = await apiFetch("/contract/my-payments");
        setPayments(paymentData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
   if (loading) return <Spinner />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-20">
        {error}
      </p>
    );

  if (!contract)
    return (
      <p className="text-center mt-20">
        No se encontró el talonario
      </p>
    );


  return (
    <div className="max-w-5xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-bold font-titles text-title mb-6 text-center">Información de Pagos</h1>

      <div className="bg-white font-info text-foreground p-6 rounded shadow">
        <p><strong>Emprendimiento:</strong> {contract.businessName}</p>
        <p><strong>Inicio:</strong> {contract.startDate}</p>
        <p><strong>Fin:</strong> {contract.endDate}</p>
        <p><strong>Frecuencia:</strong> {contract.kindOfPayment}</p>
      </div>

      <div className="mt-6 bg-green-100 border-l-4 border-green-700 text-foreground p-4 rounded">
        <p className="font-bold font-info text-lg">📅 Tu siguiente pago es el:</p>
        <p className="text-xl mt-1">{contract.nextPaymentDate}</p>
      </div>

      <Table contract={contract} payments={payments} isAdmin={false} />
    </div>
  );
};

export default MyPayments;
