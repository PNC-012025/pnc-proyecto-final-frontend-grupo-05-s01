"use client";

import { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    photo: '/user-default.png',
    priceRange: '0-100',
    facebookLink: 'https://www.facebook.com/tu.nombre.de_usuario',
    instagramLink: 'https://www.instagram.com/tu_usuario/',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los cambios
    console.log('Datos guardados:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <section className="mb-8">

            <h1 className="text-3xl font-titles font-bold text-foreground mb-8 text-center">EDITAR MI PERFIL</h1>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                <img 
                  src={formData.photo || "/user-default.png"} 
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

        {/* Primera fila: Rango de precio e Instagram */}
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
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.instagram.com/tu_usuario/"
            />
          </div>
        </div>

        {/* Segunda fila: Facebook */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-1">Link Facebook:</label>
          <input
            type="url"
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://www.facebook.com/tu.nombre.de_usuario"
          />
        </div>

        {/* Descripción */}
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

        {/* Botón de guardar */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className=" bg-secondary font-bold text-foreground px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;