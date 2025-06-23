"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const EntrepreneurCard = ({ projectName, name, carnet, career, onApprove, onReject }) => (
  <div className="bg-card rounded-xl shadow-md p-4 flex justify-between items-center w-full">
    <div>
      <h3 className="font-bold text-lg text-title">{projectName}</h3>
      <p className="text-sm font-info text-foreground">Nombre: {name}</p>
      <p className="text-sm font-info text-foreground">Carnet: {carnet}</p>
      <p className="text-sm font-info text-foreground">Carrera: {career}</p>
    </div>
    <div className="flex gap-4">
      <button
        onClick={onApprove}
        className="bg-green-800 hover:bg-green-700 text-white p-3 rounded-md transition"
      >
        <FaCheck className="text-lg" />
      </button>
      <button
        onClick={onReject}
        className="bg-red-400 hover:bg-red-400 text-white p-3 rounded-md transition"
      >
        <FaTimes className="text-lg" />
      </button>
    </div>
  </div>
);

export default function ApplicantsList() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [activeTab, setActiveTab] = useState("pendientes");

  useEffect(() => {
    const data = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      projectName: `Emprendimiento 1`,
      name: `Lorem ipsum dolor sit amet`,
      carnet: `00302344`,
      career: `Ingeniería química`,
      status: i % 2 === 0 ? "pendiente" : "resuelta",
    }));
    setEntrepreneurs(data);
  }, []);

  const handleApprove = (id) => {
    setEntrepreneurs((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "resuelta" } : e))
    );
    console.log("Aprobado:", id);
  };

  const handleReject = (id) => {
    setEntrepreneurs((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "resuelta" } : e))
    );
    console.log("Rechazado:", id);
  };

  const filteredEntrepreneurs = entrepreneurs.filter((e) =>
    activeTab === "pendientes" ? e.status === "pendiente" : e.status === "resuelta"
  );

  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-titles font-bold mb-2 text-center">
        REVISA LAS NUEVOS POSIBLES EMPRENDEDORES!
      </h2>
      <p className="text-center text-sm text-gray-700 mb-6">
        Recuerda: Revisar cuidadosamente el formulario de inscripcion
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 font-semibold ${
            activeTab === "pendientes"
              ? "bg-green-800 text-white"
              : "bg-green-200 text-green-800"
          } rounded-tl-lg rounded-tr-lg transition`}
          onClick={() => setActiveTab("pendientes")}
        >
          PENDIENTES
        </button>
        <button
          className={`px-6 py-2 font-semibold ${
            activeTab === "resueltas"
              ? "bg-green-800 text-white"
              : "bg-green-200 text-green-800"
          } rounded-tl-lg rounded-tr-lg transition`}
          onClick={() => setActiveTab("resueltas")}
        >
          RESUELTAS
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredEntrepreneurs.map((e) => (
          <EntrepreneurCard
            key={e.id}
            projectName={e.projectName}
            name={e.name}
            carnet={e.carnet}
            career={e.career}
            onApprove={() => handleApprove(e.id)}
            onReject={() => handleReject(e.id)}
          />
        ))}
        {filteredEntrepreneurs.length === 0 && (
          <p className="text-center col-span-2 text-gray-500">No hay elementos en esta sección.</p>
        )}
      </div>
    </section>
  );
}