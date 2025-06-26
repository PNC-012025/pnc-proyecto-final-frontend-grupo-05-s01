"use client";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";

const MyPayments = () => {
  const [contract, setContract] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resContract = await fetch("http://localhost:8080/api/contract/me", {
          credentials: "include",
        });
        const contractData = await resContract.json();
        setContract(contractData);

        // pagos del emprendedor
        const resPayments = await fetch("http://localhost:8080/api/contract/my-payments", {
          credentials: "include",
        });
        const paymentData = await resPayments.json();
        setPayments(paymentData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData();
  }, []);

  if (!contract) return <p className="text-center mt-10">Cargando contrato...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-bold text-title mb-6 text-center">Información de Pagos</h1>

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

      <Table contract={contract} payments={payments} isAdmin={false} />
    </div>
  );
};

export default MyPayments;
