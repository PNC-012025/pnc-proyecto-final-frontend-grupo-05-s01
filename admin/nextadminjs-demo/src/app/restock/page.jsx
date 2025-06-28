"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const RestockForm = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await apiFetch("/category");
        setCategories(data);
      } catch (err) {
        setCategoriesError("Error al cargar categorías.");
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!image) {
      alert("Por favor seleccione una imagen.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock.toString());
      formData.append("price", price);
      formData.append("categoryId", categoryId); 
      formData.append("image", image);

      await apiFetch("/products", {
        method: "POST",
        body: formData,
      });

      alert("Producto enviado para ser aprobado por un administrador.");
      router.push("/my-products");
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesError) return <p className="text-red-500 text-center">{categoriesError}</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-title mb-2 uppercase">
        Formulario de Entrega de Productos
      </h1>
      <p className="text-center text-foreground mb-1 font-info">
        Recuerda: Cada vez que desees hacer renovación de stock, debes completar previamente esta ficha de registro de productos y enviarla.
      </p>
      <p className="text-center font-bold text-sm mb-8 text-foreground">
        Se solicita llevar el producto etiquetado.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-6">
        <h2 className="font-bold text-title text-lg uppercase">Detalles de productos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-info">Nombre del producto</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Brazalete"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-info">Cantidad</label>
            <input
              type="number"
              min="1"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 1)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-info">Detalles del producto</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Ej: brazalete de perlas"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-info">Categoría</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Seleccione una categoría...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-info">Precio</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="$0.00"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-info">Seleccione una imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border border-dashed border-gray-400 w-full px-3 py-2 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-secondary text-title font-bold px-6 py-2 rounded-lg hover:bg-title hover:text-white transition uppercase"
        >
          Agregar producto
        </button>
      </form>
    </div>
  );
};

export default RestockForm;