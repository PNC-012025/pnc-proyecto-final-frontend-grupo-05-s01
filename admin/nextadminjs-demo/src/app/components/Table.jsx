import React from "react";
import dayjs from "dayjs";

const Table = ({ payments = [], isAdmin = false }) => {
  if (!payments || payments.length === 0) return <p>No hay pagos registrados.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-title mb-4">Talonario de pagos</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-title text-amber-50">
            <tr>
              {isAdmin && <th className="px-4 py-2 border">✔</th>}
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Fecha límite de pago</th>
              <th className="px-4 py-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pago, index) => {
              const estado = pago.status === "PAGADO" ? "PAGADO" : "PENDIENTE";

              return (
                <tr key={pago.expectedDate} className="text-center hover:bg-blue-50 transition">
                  {isAdmin && (
                    <td className="px-2 py-2 border">
                      <input type="checkbox" checked={estado === "PAGADO"} disabled />
                    </td>
                  )}
                  <td className="px-2 py-2 border">
                    CUOTA {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-2 py-2 border">{dayjs(pago.expectedDate).format("DD/MM/YYYY")}</td>
                  <td className="px-2 py-2 border">
                    {estado === "PAGADO" ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Pagado</span>
                    ) : (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">Pendiente</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
