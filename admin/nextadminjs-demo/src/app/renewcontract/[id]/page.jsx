"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RenewContrato() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    userId: id || "",
    amount: "",
    paymentMethod: "",
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const methods = await apiFetch("/contract/payment-methods");
        setPaymentMethods(methods || []);
      } catch (error) {
        console.error("Error al cargar métodos de pago:", error);
      }
    };

    fetchPaymentData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      formData.amount.trim() !== "" &&
      formData.paymentMethod.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    const { userId, amount, paymentMethod } = formData;

    if (!isFormValid()) {
      Swal.fire("Error", "Por favor completa todos los campos.", "error");
      return;
    }

    const payload = {
      userId: parseInt(userId),
      amount: parseFloat(amount),
      paymentMethod,
    };

    try {
      setIsSubmitting(true);

      await apiFetch(`/contract/renew/${userId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      Swal.fire("Éxito", "Productos aprobados correctamente.", "success");
      router.push(`/entrepreneurprofile/${userId}`);
    } catch (error) {
      Swal.fire("Error", "Error al renovar contrato:\n" + (error.message || error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold text-center">Renovar Contrato</h2>


      <input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Monto del Contrato"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={formData.amount}
      />

      <select
        name="paymentMethod"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={formData.paymentMethod}
      >
        <option value="">Seleccione método de pago</option>
        {paymentMethods.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
        className={`w-full py-2 rounded ${
          !isFormValid() || isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "mt-4 bg-secondary text-title font-info px-4 py-1 rounded-lg hover:bg-title hover:text-background transition text-sm"
        }`}
      >
        {isSubmitting ? "Enviando..." : "Renovar"}
      </button>
    </div>
  );
}
