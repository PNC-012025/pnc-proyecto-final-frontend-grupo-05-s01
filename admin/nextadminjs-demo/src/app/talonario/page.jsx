"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";

const MyPayments = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/contract/me", {
          credentials: "include",
        });
        const data = await res.json();
        setContract(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchContract();
  }, []);

  if (!contract) return <p className="text-center mt-10">Cargando contrato...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-titles text-title mb-6 text-center uppercase">Información de Pagos</h1>

      <div className="bg-white p-6 rounded shadow">
        <p><strong>Emprendimiento:</strong> {contract.businessName}</p>
        <p><strong>Inicio:</strong> {contract.startDate}</p>
        <p><strong>Fin:</strong> {contract.endDate}</p>
        <p><strong>Frecuencia:</strong> {contract.kindOfPayment}</p>
      </div>

      <div className="mt-6 bg-green-100 border-l-4 border-green-700 text-foreground p-4 rounded">
        <p className="font-bold text-lg">📅 Tu siguiente pago es el:</p>
        <p className="text-xl mt-1">{contract.nextPaymentDate}</p>
      </div>

      <Table contract={contract} isAdmin={false} />
    </div>
  );
};

export default MyPayments;
