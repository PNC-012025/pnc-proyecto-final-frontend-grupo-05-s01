"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { apiFetch } from '@/lib/api'

const Page = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);

useEffect(() => {
    async function fetchContract() {
      try {
        const data = await apiFetch(`/admin/business/contracts/${id}`);
        if (data) {
          setEntrepreneur(data);
          setIsActive(data.statusBusiness === "ACTIVO");
        } else {
          setEntrepreneur(null);
        }
      } catch (err) {
        setError(err.message || "Error al cargar el contrato");
      } finally {
        setLoading(false);
      }
    }

    fetchContract();
  }, [id]);

   const handleToggleStatus = async () => {
    const newStatus = isActive ? "INACTIVO" : "ACTIVO";
    try {
      await apiFetch(`/admin/business/businesses/disable/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      setIsActive(!isActive);
    } catch (err) {
      console.error("Error al cambiar el estado", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando contrato...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!entrepreneur) {
    return <div className="text-center mt-10">Este emprendedor no tiene contrato</div>;
  }

  if (
  entrepreneur.startDate == null ||
  entrepreneur.endDate == null ||
  entrepreneur.kindOfPayment == null 
  ) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img
        src="/warning.jpg"  
        alt="Advertencia"
        className="w-16 h-16 mb-4"
      />
      <p className="text-lg font-info text-title text-center mb-4">
        Este emprendedor no tiene contrato
      </p>
      <button
        className="mt-4 bg-secondary text-title font-info px-4 py-1 rounded-lg hover:bg-title hover:text-background transition text-sm"
        onClick={() => {
          console.log("Crear contrato clicado");
        }}
      >
        CREAR CONTRATO
      </button>
    </div>
  );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl my-16">
      <h1 className="text-center text-xl font-semibold text-title font-titles mb-8">
        CONTRATO DE ALQUILER DE PUESTO EN MERCADUCA
      </h1>

      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div className="md:w-1/3 flex justify-center mt-4">
          <img
           src={entrepreneur.urlLogo}
           alt="Logo"
           width={120}
           height={120}
           className="rounded-full object-cover"
          />
        </div>

        {/*  Toggle buttom: para pantallas pequeñas como moviles, se centra debjo de la imagen */}
        <div className="flex justify-center md:hidden mb-4">
          <div
            onClick={handleToggleStatus}
            className={`w-24 h-9 rounded-full relative flex items-center px-2 transition-all duration-300 cursor-pointer ${
              isActive ? "bg-primary" : "bg-red-400"
            }`}
          >
            <span
              className={`text-background text-[10px] font-info font-bold absolute z-10 transition-all duration-300 ${
                isActive ? "left-3" : "right-3"
              }`}
            >
              {isActive ? "ACTIVO" : "INACTIVO"}
            </span>
            <div
              className={`w-6 h-6 bg-background rounded-full shadow-md absolute top-1 transition-transform duration-300 ${
                isActive ? "translate-x-[60px]" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Client's information */}
        <div className="md:w-2/3 space-y-4 pl-4">
          <div className="flex justify-between items-center pr-4">
            <h2 className="text-lg font-semibold">Información del cliente:</h2>

            {/* switch not visible in mobile screens*/}
            <div className="hidden md:block">
              <div
               onClick={handleToggleStatus}
                className={`w-24 h-9 rounded-full relative flex items-center px-2 transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-primary" : "bg-red-400"
                }`}
              >
                <span
                  className={`text-background text-[10px] font-info font-bold absolute z-10 transition-all duration-300 ${
                    isActive ? "left-3" : "right-3"
                  }`}
                >
                  {isActive ? "ACTIVO" : "INACTIVO"}
                </span>
                <div
                  className={`w-6 h-6 bg-background rounded-full shadow-md absolute top-1 transition-transform duration-300 ${
                    isActive ? "translate-x-[60px]" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-foreground space-y-3">
            <p>
              <strong>Emprendimiento:</strong> {entrepreneur.businessName}
            </p>
            <p>
              <strong>Dueño:</strong> {`${entrepreneur.ownerName} ${entrepreneur.ownerLastName}`}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {entrepreneur.ownerMail}
            </p>
            <p>
              <strong>Número de teléfono:</strong> {entrepreneur.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Contract duration */}
      <div className="mb-10">
        <div className="pl-4 space-y-4">
          <h3 className="text-lg font-semibold">Duración del contrato:</h3>
          <p className="text-sm text-foreground">
            De acuerdo a las políticas de Mercaduca, el período de participación
            en el local emprendedor es de tres meses
          </p>
          <div className="text-sm text-foreground space-y-3">
            <p><strong>Fecha de inicio:</strong> {entrepreneur.startDate}</p>
            <p><strong>Fecha de fin:</strong> {entrepreneur.endDate}</p>
          </div>
        </div>
      </div>

      {/* Ammount and payment date */}
      <div className="pl-4 space-y-4">
        <h3 className="text-lg font-semibold">Monto y forma de pago:</h3>
        <div className="text-sm text-foreground space-y-3">
          <p><strong>Frecuencia de pago:</strong> {entrepreneur.kindOfPayment}</p>
          <p><strong>Método de pago:</strong> {entrepreneur.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
