"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

const ProductosPendientesPage = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await apiFetch(`/products/pending?businessId=${id}`);
        setProductos(data || []);
      } catch (error) {
        console.error("Error al cargar productos pendientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background">
      <h1 className="text-3xl font-titles text-title text-center uppercase mb-6">
        Productos Pendientes
      </h1>

      {productos.length === 0 ? (
        <p className="text-center text-foreground font-info">
          No hay productos pendientes para este emprendimiento.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-sm font-info">
            <thead className="bg-gray-100 text-left">
              <tr>
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
              {productos.map((prod) => (
                <tr key={prod.id}>
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
      )}
    </div>
  );
};

export default ProductosPendientesPage;
