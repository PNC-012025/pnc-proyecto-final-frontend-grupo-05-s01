"use client";

import { useEffect, useState } from "react";

const ContractView = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/contract/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No se pudo cargar el contrato");

        const data = await res.json();
        setContract(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContract();
  }, []);

  if (!contract) {
    return <p className="text-center mt-10">Cargando contrato...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-md p-6 border">
        <h1 className="text-center text-titles text-foreground md:text-2xl font-semibold mb-6 uppercase">
          Contrato de Alquiler de Puesto en Mercaduca
        </h1>

        <div className="mb-6">
          <h2 className="font-semibold mb-2 text-titles text-foreground">Información del cliente:</h2>
          <p className="mb-2 text-foreground"><strong>Emprendimiento:</strong> {contract.businessName}</p>
          <p className="mb-2 text-foreground"><strong>Dueño:</strong> {contract.ownerName} {contract.ownerLastName}</p>
          <p className="mb-2 text-foreground"><strong>Correo electrónico:</strong> {contract.ownerMail}</p>
          <p className="mb-2 text-foreground"><strong>Número de teléfono:</strong> +503 {contract.phone}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Duración del contrato:</h2>
          <p className="mb-2 text-foreground">
            De acuerdo a las políticas de Mercaduca, el período de participación en el local emprendedor es de tres meses
          </p>
          <p className="mb-2"><strong>Estado actual:</strong> {contract.status || "Pendiente"}</p>
          <p className="mb-2"><strong>Fecha de inicio:</strong> {contract.startDate || "DD/MM/YY"}</p>
          <p className="mb-2"><strong>Fecha de fin:</strong> {contract.endDate || "DD/MM/YY"}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Monto y forma de pago:</h2>
          <p className="mb-2"><strong>Frecuencia de pago:</strong> {contract.kindOfPayment || "Mensual"}</p>
          <p className="mb-2"><strong>Método de pago:</strong> {contract.paymentMethod || "Efectivo"}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Causales de terminación:</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
            <li>El emprendedor/a incumple las políticas establecidas.</li>
            <li>
              El emprendedor presenta mala actitud ante los miembros del Centro de Orientación Profesional y/o personal de Mercaduca durante su estancia en el local emprendedor.
            </li>
            <li>
              El emprendedor no cumple con los pagos de alquiler en las fechas establecidas anteriormente.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ContractView;
