import React from "react";
import dayjs from "dayjs";

const generateMonthlyDates = (start, end) => {
  const result = [];
  let current = dayjs(start);

  while (current.isBefore(end) || current.isSame(end, "day")) {
    result.push(current.format("DD/MM/YYYY"));
    current = current.add(1, "month");
  }

  return result;
};

const ContractPaymentTable = ({ contract, isAdmin = false }) => {
  if (!contract) return null;

  const { startDate, endDate } = contract;
  const paymentDates = generateMonthlyDates(startDate, endDate);

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
            {paymentDates.map((date, i) => (
              <tr key={i} className="text-center hover:bg-blue-50 transition">
                {isAdmin && (
                  <td className="px-2 py-2 border">
                    <input type="checkbox" />
                  </td>
                )}
                <td className="px-2 py-2 border">CUOTA {String(i + 1).padStart(2, "0")}</td>
                <td className="px-2 py-2 border">{date}</td>
                <td className="px-2 py-2 border">
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                    Pendiente
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractPaymentTable;
