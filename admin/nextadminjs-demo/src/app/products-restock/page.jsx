"use client";

import { useEffect, useState } from "react";

const MyReStockProducts = () => {
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: 1,
    categoryid: "",
    image: null,
    previewImage: null
  });

  const [addedProducts, setAddedProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Alimentos" },
    { id: 3, name: "Ropa" },
    { id: 4, name: "Hogar" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setCurrentProduct((prev) => ({ ...prev, image: file, previewImage: preview }));
    }
  };

  const handleAddProduct = async () => {
    const { name, price, description, stock, categoryid, image } = currentProduct;
    if (!name || !price || !stock || !categoryid || !image) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("stock", stock);
    form.append("categoryid", categoryid);
    form.append("image", image);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (!res.ok) throw new Error("Error al crear producto");

      alert("Producto agregado correctamente");
      setAddedProducts((prev) => [...prev, currentProduct]);
      setCurrentProduct({
        name: "",
        price: "",
        description: "",
        stock: 1,
        categoryid: "",
        image: null,
        previewImage: null,
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("No se pudo agregar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl text-green-900 font-bold mb-4 uppercase">
          Formulario de Entrega de Productos
        </h1>

        <p className="text-center text-sm md:text-base text-gray-600 mb-6">
          Recuerda: Cada vez que desees hacer renovación de stock, debes completar esta ficha de registro de productos y enviarla. <br />
          <span className="font-semibold text-black">Se solicita llevar el producto etiquetado.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del producto</label>
            <input
              name="name"
              value={currentProduct.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              placeholder="Ej. Croissant"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cantidad</label>
            <input
              type="number"
              name="stock"
              value={currentProduct.stock}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Detalle del producto</label>
            <textarea
              name="description"
              value={currentProduct.description}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              name="categoryid"
              value={currentProduct.categoryid}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Selecciona una imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block border p-2 rounded-md w-full"
          />
          {currentProduct.previewImage && (
            <img
              src={currentProduct.previewImage}
              alt="Vista previa"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={handleAddProduct}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            AGREGAR PRODUCTO
          </button>
        </div>

        {addedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {addedProducts.map((prod, i) => (
              <div key={i} className="border rounded-xl p-4 shadow text-center">
                <img
                  src={prod.previewImage}
                  alt={prod.name}
                  className="w-24 h-24 mx-auto mb-2 object-cover rounded"
                />
                <h3 className="font-bold text-lg mb-1">{prod.name}</h3>
                <p className="text-sm text-gray-700">Precio: ${prod.price}</p>
                <p className="text-sm text-gray-600 mt-1">{prod.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReStockProducts;
