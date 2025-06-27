"use client";
import React, { useState, useEffect } from "react";

const RestockForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  // Cargar categorías disponibles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Por favor seleccione una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("categoryid", categoryId);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("Producto agregado con éxito");
        setName("");
        setDescription("");
        setStock(1);
        setPrice("");
        setCategoryId("");
        setImage(null);
      } else {
        alert("Error al agregar el producto.");
      }
    } catch (err) {
      console.error("Error en el envío:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-title mb-2 uppercase">
        Formulario de Entrega de Productos
      </h1>
      <p className="text-center text-foreground mb-1 font-info">
        Recuerda: Cada vez que desees hacer renovación de stock, debes completar previamente esta ficha de registro de productos y enviarla.
      </p>
      <p className="text-center font-bold text-sm mb-8 text-foreground">Se solicita llevar el producto etiquetado.</p>

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
              onChange={(e) => setStock(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
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
