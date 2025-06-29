"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api"; 

const TalonarioAdminPage = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await apiFetch(`/contract/user-payments/${id}`);
        setPayments(data);
      } catch (err) {
        console.error("Error al cargar pagos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [id]);

  const handleMarkAsPaid = async (paymentId) => {
    const { value: method } = await Swal.fire({
      title: "Registrar pago",
      input: "select",
      inputOptions: {
        EFECTIVO: "Efectivo",
        TARJETA: "Tarjeta",
        TRANSFERENCIA: "Transferencia",
      },
      inputPlaceholder: "Selecciona el método de pago",
      showCancelButton: true,
    });

    if (method) {
      try {
        await apiFetch(`/contract/payment-by-id?paymentId=${paymentId}&paymentMethod=${method}`, {
          method: "POST",
        });

        Swal.fire("¡Pago registrado!", "El estado ha sido actualizado.", "success");

        const updated = payments.map((p) =>
          p.id === paymentId
            ? {
                ...p,
                status: "PAGADO",
                paymentMethod: method,
                date: new Date().toISOString().split("T")[0],
              }
            : p
        );
        setPayments(updated);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando pagos...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-titles text-title text-center mb-6">
        Talonario de Pagos
      </h1>

      <table className="w-full table-auto border text-sm font-info text-foreground">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">Fecha Esperada</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Método</th>
            <th className="border p-2">Fecha de Pago</th>
            <th className="border p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pago) => (
            <tr key={pago.id} className={pago.status === "PAGADO" ? "bg-green-50" : ""}>
              <td className="border p-2">{pago.expectedDate}</td>
              <td className="border p-2">{pago.status}</td>
              <td className="border p-2">{pago.paymentMethod || "-"}</td>
              <td className="border p-2">{pago.date || "-"}</td>
              <td className="border p-2 text-center">
                {pago.status !== "PAGADO" ? (
                  <button
                    onClick={() => handleMarkAsPaid(pago.id)}
                    className="bg-primary hover:bg-secondary hover:text-title  text-background cursor-pointer px-3 py-1 rounded"
                  >
                    Registrar Pago
                  </button>
                ) : (
                  <span className="text-green-600 font-bold">✔</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TalonarioAdminPage;
