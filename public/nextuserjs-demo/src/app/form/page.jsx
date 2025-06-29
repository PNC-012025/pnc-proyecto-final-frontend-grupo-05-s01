"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { apiFetch } from "@/lib/api";

export default function RequestForm() {
  function getErrorMessages(error) {
    if (typeof error === "object" && error !== null) {
      return Object.values(error);
    }
    if (error?.message) return [error.message];
    return ["Ocurrió un error inesperado"];
  }

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    fechaNacimiento: "",
    tipoEmprendedor: "",
    carnetUCA: "",
    facultad: "",
    carrera: "",
    nombreEmprendimiento: "",
    descripcionEmprendimiento: "",
    sectorEmprendimiento: "",
    productos: "",
    rangoPrecios: "",
    facebook: "",
    instagram: "",
    telefono: "",
    aceptoTerminos: false,
  });

  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await apiFetch("/major");
        setFaculties(data);
      } catch (error) {
        console.error("Error al cargar facultades:", error);
      }
    };
    fetchFaculties();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFacultyChange = async (e) => {
    const facultyId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      facultad: facultyId,
      carrera: "",
    }));

    try {
      const data = await apiFetch(`/major/${facultyId}/majors`);
      setMajors(data);
    } catch (error) {
      console.error("Error al cargar carreras:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logoFile) {
      Swal.fire({
        icon: "warning",
        title: "Logo requerido",
        text: "Por favor selecciona un logo antes de enviar.",
      });
      return;
    }

    Swal.fire({
      title: "Enviando...",
      html: "Por favor espera mientras se envía el formulario.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const form = new FormData();
      form.append("userName", formData.nombre);
      form.append("userLastName", formData.apellido);
      form.append("userGender", formData.sexo);
      form.append("userBirthDate", formData.fechaNacimiento);
      form.append("entrepeneurKind", formData.tipoEmprendedor);
      form.append("userEmail", formData.carnetUCA);
      form.append("userFaculty", formData.facultad);
      form.append("userMajor", formData.carrera);
      form.append("businessName", formData.nombreEmprendimiento);
      form.append("description", formData.descripcionEmprendimiento);
      form.append("sector", formData.sectorEmprendimiento);
      form.append("productType", formData.productos);
      form.append("priceRange", formData.rangoPrecios);
      form.append("facebook", formData.facebook);
      form.append("instagram", formData.instagram);
      form.append("phone", formData.telefono);
      form.append("logo", logoFile);

      await apiFetch("/business-requests", {
        method: "POST",
        body: form,
      });

      Swal.fire({
        icon: "success",
        title: "Formulario enviado",
        text: "✅ Tu solicitud fue enviada exitosamente.",
      });

      // Resetea el formulario
      setFormData({
        nombre: "",
        apellido: "",
        sexo: "",
        fechaNacimiento: "",
        tipoEmprendedor: "",
        carnetUCA: "",
        facultad: "",
        carrera: "",
        nombreEmprendimiento: "",
        descripcionEmprendimiento: "",
        sectorEmprendimiento: "",
        productos: "",
        rangoPrecios: "",
        facebook: "",
        instagram: "",
        telefono: "",
        aceptoTerminos: false,
      });
      setLogoFile(null);
      setMajors([]);
    } catch (error) {
      console.error("Error en la petición:", error);

      let messages = [];

      if (error.details) {
        messages = error.details;
      } else if (error.message) {
        try {
          const parsed = JSON.parse(error.message);
          messages =
            typeof parsed === "object" && parsed !== null
              ? Object.values(parsed).flat()
              : [error.message];
        } catch {
          messages = [error.message];
        }
      } else {
        messages = ["Ocurrió un error inesperado"];
      }
      messages = messages
        .flatMap((msg) => (Array.isArray(msg) ? msg : [msg]))
        .filter((msg) => msg && msg.trim() !== "");

      Swal.fire({
        title:
          '<strong style="color: #dc2626; font-size: 1.5rem">Corrige estos errores</strong>',
        icon: "error",
        html: `
    <div style="text-align: left; color: #4b5563; margin-top: 1rem">
      ${messages
        .map(
          (msg) => `
        <div style="display: flex; align-items: flex-start; margin-bottom: 0.5rem">
          <svg style="flex-shrink: 0; margin-right: 0.5rem; margin-top: 0.25rem" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>${msg}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `,
        showCloseButton: true,
        closeButtonHtml: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#dc2626",
        focusConfirm: false,
        customClass: {
          popup: "rounded-lg shadow-xl",
          closeButton: "hover:bg-gray-100 rounded-full p-1 transition-colors",
          confirmButton: "px-4 py-2 rounded-md font-medium",
        },
      });
    }
  };

  return (
    <main className="bg-background min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl space-y-6 border-2 border-gray-200"
      >
        <h1 className="text-3xl font-titles font-bold text-center text-title mb-4">
          Formulario de registro
        </h1>
        <p className="text-center font-titles text-foreground">
          Te invitamos a que completes el siguiente formulario para que podamos
          conocer más de tu marca.
        </p>

        <div className="text-foreground font-info text-sm text-justify space-y-4">
          <p>
            Bienvenido/a al registro de emprendimientos UCA interesados en poder
            colocar sus productos en el local emprendedor mercaduca. Este
            formulario no es una seguridad para que tu marca pueda ser parte del
            local, es una solicitud que pasará a revisión y aprobación.
          </p>
          <p>
            Te pedimos de favor llenar los datos solicitados para poder anotarte
            y contar con tus datos para ser tomado en cuenta en el proceso.
          </p>
          <p>
            Esta no es una reserva ni brinda derecho al espacio, es únicamente
            para comenzar tu proceso.
          </p>
          <p>*CUPO LIMITADO*</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <InputField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          <SelectField
            label="Sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            options={["Masculino", "Femenino"]}
          />
          <InputField
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
          <SelectField
            label="Tipo de emprendedor"
            name="tipoEmprendedor"
            value={formData.tipoEmprendedor}
            onChange={handleChange}
            options={["Individual", "Empresa"]}
          />
          <InputField
            label="Carnet UCA"
            name="carnetUCA"
            value={formData.carnetUCA}
            onChange={handleChange}
            placeholder="ej. 00234521@uca.edu.sv"
          />

          <div>
            <label className="block text-sm font-medium text-foreground">
              Facultad:
            </label>
            <select
              name="facultad"
              value={formData.facultad}
              onChange={handleFacultyChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
            >
              <option value="">Seleccione una facultad</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Carrera:
            </label>
            <select
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
            >
              <option value="">Seleccione una carrera</option>
              {majors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Campos adicionales del negocio */}
        {[
          {
            label: "¿Cuál es el nombre de tu emprendimiento?",
            name: "nombreEmprendimiento",
          },
          {
            label: "¿En qué consiste tu emprendimiento en pocas palabras?",
            name: "descripcionEmprendimiento",
          },
          {
            label: "¿En qué sector opera tu emprendimiento?",
            name: "sectorEmprendimiento",
          },
          { label: "¿Qué tipo de productos ofreces?", name: "productos" },
          {
            label: "¿En qué rango de precios se encuentran los productos?",
            name: "rangoPrecios",
          },
          { label: "Link de tu perfil en Facebook", name: "facebook" },
          { label: "Link de tu perfil en Instagram", name: "instagram" },
          { label: "Número de tu teléfono celular", name: "telefono" },
        ].map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        {/* Logo de la brand*/}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Logo del emprendimiento:
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
          />
        </div>

        {/* "aceptar terms and conditions" */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aceptoTerminos"
            className="h-4 w-4 text-primary border-gray-300 rounded"
            checked={formData.aceptoTerminos}
            onChange={handleChange}
          />
          <label className="ml-2 block text-sm text-foreground">
            Estoy de acuerdo con los términos y condiciones.
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-secondary text-titles py-2 px-4 rounded-md hover:bg-title hover:text-background transition-colors"
          >
            ENVIAR FORMULARIO
          </button>
        </div>
      </form>
    </main>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({ label, name, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        {label}:
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
