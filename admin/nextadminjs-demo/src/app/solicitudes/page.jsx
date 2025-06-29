"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSortUp, FaSortDown } from "react-icons/fa";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

const EntrepreneurCard = ({
  id,
  projectName,
  name,
  carnet,
  career,
  status,
  onApprove,
  onReject,
  showActions = true,
  isLoading = false,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/entrepreneurform/${id}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-xl shadow-md p-4 flex justify-between items-center w-full cursor-pointer hover:shadow-lg transition"
    >
      <div>
        <h3 className="font-bold font-info text-lg text-title">{projectName}</h3>
        <p className="text-sm font-info text-foreground">Nombre: {name}</p>
        <p className="text-sm font-info text-foreground">Carnet: {carnet}</p>
        <p className="text-sm font-info text-foreground">Carrera: {career}</p>
      </div>
      {showActions ? (
        <div className="flex gap-4" onClick={stopPropagation}>
          <button
            onClick={onApprove}
            disabled={isLoading}
            className={`bg-green-800 hover:bg-green-600 text-white p-3 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaCheck className="text-lg" />
          </button>
          <button
            onClick={onReject}
            disabled={isLoading}
            className={`bg-red-400 hover:bg-red-800 text-white p-3 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ) : (
        <span
          className={`px-4 py-2 text-white text-sm font-bold font-info rounded-md ${
            status === "APROBADO" ? "bg-title" : "bg-red-700"
          }`}
        >
          {status}
        </span>
      )}
    </div>
  );
};

export default function ApplicantsList() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDIENTES");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [loadingId, setLoadingId] = useState(null);

  const statusMap = {
    PENDIENTES: "PENDIENTE",
    APROBADAS: "APROBADO",
    RECHAZADAS: "RECHAZADO",
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const query = `/business-requests/filter?page=${page}&size=10&status=${statusMap[activeTab]}&sortDirection=${sortDirection}`;
      const res = await apiFetch(query);
      setEntrepreneurs(res.content || []);
      setPage(res.number);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los emprendedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, page, sortDirection]);

const updateStatus = async (id, action) => {
  try {
    setLoadingId(id);

    const options = {
      method: "POST",
    };

    if (action === "reject") {
      const { value: reason } = await Swal.fire({
        title: "Razón del rechazo",
        input: "text",
        inputLabel: "Por favor, ingrese el motivo",
        inputPlaceholder: "Escribe aquí...",
        showCancelButton: true,
        confirmButtonText: "Rechazar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) {
            return "Debes ingresar una razón para continuar.";
          }
        },
      });

      if (!reason) {
        setLoadingId(null);
        return;
      }

      options.body = JSON.stringify({ reason });
    }

    await apiFetch(`/business-requests/${id}/${action}`, options);
    await fetchData();

    if (action === "approve") {
      Swal.fire("Éxito", "Solicitud aprobada correctamente.", "success");
    } else {
      Swal.fire("Rechazada", "Solicitud rechazada correctamente.", "info");
    }
  } catch (error) {
    console.error(`Error al ${action} solicitud ${id}`, error);
    Swal.fire("Error", `No se pudo procesar la solicitud.`, "error");
  } finally {
    setLoadingId(null);
  }
};

  return (
    <section className="py-10 px-6">
      <h2 className="text-center text-2xl font-titles text-title font-bold mb-6 mt-4">
        ¡Revisa los nuevos posibles emprendedores! 
      </h2>
      <p className="text-center text-sm text-foreground font-info mb-6">
        Recuerda revisar cuidadosamente el formulario de inscripción
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-1">
        {["PENDIENTES", "APROBADAS", "RECHAZADAS"].map((tab) => {
          const isActive = activeTab === tab;
          const baseClasses = "px-6 py-2 font-info rounded-t-lg transition cursor-pointer";
          let colorClasses = "";

          if (tab === "PENDIENTES") {
            colorClasses = isActive
              ? "bg-green-800 text-white"
              : "bg-green-100 text-green-900";
          } else if (tab === "APROBADAS") {
            colorClasses = isActive
              ? "bg-emerald-700 text-white"
              : "bg-emerald-100 text-emerald-800";
          } else if (tab === "RECHAZADAS") {
            colorClasses = isActive
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-800";
          }

          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
              }}
              className={`${baseClasses} ${colorClasses}`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end max-w-6xl mx-auto mb-4">
        <button
          onClick={() => setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))}
          className="flex items-center gap-2 px-4 py-2 bg-card hover:border-card rounded-md text-sm font-medium text-gray-800 font-info transition"
        >
          {sortDirection === "desc" ? (
            <>
              <FaSortDown className="text-lg" />
              Más reciente primero
            </>
          ) : (
            <>
              <FaSortUp className="text-lg" />
              Más antiguo primero
            </>
          )}
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {entrepreneurs.map((e) => (
              <EntrepreneurCard
                key={e.id}
                id={e.id}
                projectName={e.businessName}
                name={`${e.userName} ${e.userLastName}`}
                carnet={e.userEmail}
                career={e.majorName}
                status={e.status}
                onApprove={() => updateStatus(e.id, "approve")}
                onReject={() => updateStatus(e.id, "reject")}
                showActions={activeTab === "PENDIENTES"}
                isLoading={loadingId === e.id}
              />
            ))}
            {entrepreneurs.length === 0 && (
              <p className="text-center font-info col-span-2 text-foreground">
                No hay elementos en esta sección.
              </p>
            )}
          </div>

          {/* Paginación */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              className="px-4 py-2 bg-secondary text-title cursor-pointer font-info rounded disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Anterior
            </button>
            <span className="self-center">
              Página {page + 1} de {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-secondary text-title cursor-pointer font-info rounded disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page + 1 >= totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}
