"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const ProductosPendientesPage = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [remark, setRemark] = useState(""); // NUEVO: comentario del usuario

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/products/pending?businessId=${id}`);
      setProductos(data || []);
    } catch (error) {
      console.error("Error al cargar productos pendientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [id]);

  const toggleCheckbox = (productId) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleApproveSelected = async () => {
    if (productos.length === 0) return;

    if (selectedIds.length === 0) {
      Swal.fire("Atención", "Selecciona al menos un producto para aprobar.", "warning");
      return;
    }

    const allIds = productos.map((p) => p.id);
    const rejectedProductIds = allIds.filter((id) => !selectedIds.includes(id));

    try {
      await apiFetch("/products/approve-batch", {
        method: "POST",
        body: JSON.stringify({
          approvedProductIds: selectedIds,
          rejectedProductIds,
          remark: remark || "Procesado sin comentario",
        }),
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire("Éxito", "Productos actualizados correctamente.", "success");

      await fetchProductos();
      setSelectedIds([]);
      setRemark("");
    } catch (error) {
      console.error("Error al procesar productos:", error);
      Swal.fire("Error", "No se pudieron actualizar los productos.", "error");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-titles text-title text-center uppercase mb-6">
        Productos Pendientes
      </h1>

      <div className="text-right mb-4">
        <button
          onClick={handleApproveSelected}
          disabled={selectedIds.length === 0}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
            selectedIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Procesar productos.
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="text-center text-foreground font-info">
          No hay productos pendientes para este emprendimiento.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full table-auto border text-sm font-info">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border p-2">✔</th>
                  <th className="border p-2">Imagen</th>
                  <th className="border p-2">Producto</th>
                  <th className="border p-2">Categoría</th>
                  <th className="border p-2">Descripción</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Precio</th>
                  <th className="border p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {productos
                  .filter((prod) => prod.status === "PENDIENTE")
                  .map((prod) => (
                    <tr key={prod.id}>
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(prod.id)}
                          onChange={() => toggleCheckbox(prod.id)}
                        />
                      </td>
                      <td className="border p-2">
                        <img
                          src={prod.urlImage}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border p-2">{prod.name}</td>
                      <td className="border p-2">{prod.categoryName}</td>
                      <td className="border p-2">{prod.description}</td>
                      <td className="border p-2">{prod.stock}</td>
                      <td className="border p-2">
                        {prod.price?.price != null
                          ? `$${Number(prod.price.price).toFixed(2)}`
                          : "-"}
                      </td>
                      <td className="border p-2">{prod.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentario (opcional):
            </label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Ingrese un comentario sobre la revisión..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductosPendientesPage;
