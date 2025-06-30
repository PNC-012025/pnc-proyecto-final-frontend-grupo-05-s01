"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    priceRange: '',
    facebook: '',
    instagram: '',
    description: '',
    phone: '',
    logo: null,
    previewPhoto: '/user-default.png'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch("/business/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Error al obtener negocio");

        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          priceRange: data.priceRange || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          description: data.description || '',
          phone: data.phone || '',
          previewPhoto: data.urlLogo || '/user-default.png'
        }));
      } catch (error) {
        console.error("Error cargando datos del negocio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, previewPhoto: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("priceRange", formData.priceRange);
    form.append("facebook", formData.facebook);
    form.append("instagram", formData.instagram);
    form.append("phone", formData.phone);

    if (formData.logo) {
      form.append("logo", formData.logo);
    }

    try {
      const res = await fetch("/business/profile", {
        method: "PUT",
        credentials: "include",
        body: form
      });

      if (!res.ok) throw new Error("Error al actualizar negocio");

      console.log("Redirigiendo a /myprofile");

      alert("¡Perfil actualizado correctamente!");
      router.replace("/myprofile");
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  if (loading) return <div className="text-center py-10">Cargando datos...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <section className="mb-8">
          <h1 className="text-3xl font-titles font-bold text-foreground mb-8 text-center">EDITAR MI PERFIL</h1>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
              <img 
                src={formData.previewPhoto} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            </div>
            <label className="cursor-pointer bg-secondary font-bold text-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition">
              CAMBIAR FOTO
              <input 
                type="file" 
                onChange={handlePhotoUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Rango de precio:</label>
              <select
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="0-100">$0 - $100</option>
                <option value="0-10">$0 - $10</option>
                <option value="10-30">$10 - $30</option>
                <option value="30-70">$30 - $70</option>
                <option value="70-100">$70 - $100</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Link Instagram:</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://www.instagram.com/tu_usuario/"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Link Facebook:</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.facebook.com/tu.nombre.de_usuario"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Número de teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="+503 7000 0000"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-1">Descripción:</label>
            <p className="text-xs text-gray-500 mb-2">Cuéntanos más sobre tu marca</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={275}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.description.length}/275 caracteres
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-secondary font-bold text-foreground px-8 py-3 rounded-lg hover:bg-title transition hover:text-background"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
