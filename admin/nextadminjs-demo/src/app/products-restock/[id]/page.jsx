"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiFetch } from "@/lib/api";
import Spinner from "../../components/Spinner";

const RestockProduct = () => {
  const { id: productId } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatedData, setUpdatedData] = useState({
    description: "",
    stock: 1,
    image: null,
    previewImage: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiFetch(`/products/${productId}`);
        setProduct(data);
        setUpdatedData((prev) => ({
          ...prev,
          description: data.description,
          stock: data.stock,
          previewImage: data.urlImage,
        }));
      } catch (error) {
        console.error("Error al cargar producto:", error);
         setError("No se pudo cargar el producto.");
      }finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Spinner />;
  if (error)   return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!product) return <p className="text-center mt-20">Producto no encontrado.</p>;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUpdatedData((prev) => ({ ...prev, image: file, previewImage: preview }));
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("description", updatedData.description);
    form.append("stock", updatedData.stock);
    if (updatedData.image) form.append("image", updatedData.image);

    try {
      await apiFetch(`/products/update/${productId}`, {
        method: "PATCH",
        body: form,
      });

      Swal.fire("¡Actualizado!", "El producto ha sido actualizado con éxito", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiFetch(`/products/${productId}`, {
            method: "DELETE",
          });

          Swal.fire("Eliminado", "El producto fue eliminado correctamente", "success");
          router.push("/my-products");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  if (!product) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-center text-2xl font-bold mb-6">Editar Producto</h1>

      <div>
        <label className="block font-medium mb-1">Nombre del producto</label>
        <input
          type="text"
          value={product.name}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Precio</label>
        <input
          type="number"
          value={product.price?.price ?? 0}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Categoría</label>
        <input
          type="text"
          value={product.category?.name || "No especificado"}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          name="description"
          value={updatedData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Cantidad en stock</label>
        <input
          type="number"
          name="stock"
          value={updatedData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={1}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Imagen</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {updatedData.previewImage && (
          <img
            src={updatedData.previewImage}
            alt="Vista previa"
            className="mt-3 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Actualizar
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default RestockProduct;
