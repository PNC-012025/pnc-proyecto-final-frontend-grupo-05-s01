"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const EntrepreneurCard = ({ projectName, name, carnet, career, onApprove, onReject }) => (
    <div className="bg-green-100 rounded-xl shadow-md p-4 flex justify-between items-center w-full">
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
                className="bg-red-500 hover:bg-red-400 text-white p-3 rounded-md transition"
            >
                <FaTimes className="text-lg" />
            </button>
        </div>
    </div>
);

export default function ApplicantsList() {
    const [entrepreneurs, setEntrepreneurs] = useState([]);

    useEffect(() => {
    // Simulación de una llamada API
        const data = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            projectName: `Emprendimiento 1`,
            name: `Lorem ipsum dolor sit amet`,
            carnet: `00302344`,
            career: `Ingeniería química`,
        }));
        setEntrepreneurs(data);
    }, []);

    const handleApprove = (id) => {
        console.log("Aprobado:", id);
    };

    const handleReject = (id) => {
        console.log("Rechazado:", id);
    };

    return (
        <section className="py-10 px-6">
            <h2 className="text-3xl font-titles font-bold mb-6 text-center">
                Revisa las nuevos posibles emprendedores!
            </h2>
            <p className="text-center text-sm text-gray-700 mb-8">
                Recuerda: Revisar cuidadosamente el formulario de inscripcion
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {entrepreneurs.map((e) => (
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
            </div>
        </section>
    );
}