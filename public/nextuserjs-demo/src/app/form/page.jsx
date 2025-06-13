"use client";

import { useState } from "react";

export default function RequestForm() {
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
    redesSociales: "",
    telefono: "",
    logo: null,
    aceptoTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

  
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones en el correo y numero de telefono al enviar el formulario
    if (!/^[^\s@]+@uca\.edu\.sv$/.test(formData.carnetUCA)) {
       alert("Por favor, ingresa un correo electrónico con el dominio uca.edu.sv.");
       return;
}

    if (!/^\d{8}$/.test(formData.telefono)) {
      alert("El teléfono debe ser un número de 8 dígitos sin guiones.");
      return;
    }

    if (!formData.aceptoTerminos) {
      alert("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    // Transformacion de la fecha a dd/mm/yy para que coincida con formato en la api
  const formattedData = {
    ...formData,
    fechaNacimiento: formData.fechaNacimiento 
      ? formData.fechaNacimiento.split("-").reverse().join("/")
      : "",
  };

    // Simulación para enviar los datos a la api 
    console.log("Datos enviados:", formattedData);

    alert("Formulario enviado con éxito.");
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
      redesSociales: "",
      telefono: "",
      logo: null,
      aceptoTerminos: false,
    });
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
          Te invitamos a que completes el siguiente formulario para que podamos conocer más de tu marca.
        </p>

        <div className="text-foreground font-info text-sm text-justify space-y-4">
          <p>
            Bienvenido/a al registro de emprendimientos UCA interesados en poder colocar sus productos en el local emprendedor mercaduca. Este formulario no es una seguridad para que tu marca pueda ser parte del local, es una solicitud que pasará a revisión y aprobación.
          </p>
          <p>
            Te pedimos de favor llenar los datos solicitados para poder anotarte y contar con tus datos para ser tomado en cuenta en el proceso.
          </p>
          <p>Esta no es una reserva ni brinda derecho al espacio, es únicamente para comenzar tu proceso.</p>
          <p>*CUPO LIMITADO*</p>
        </div>

        {/* Primeros campos del formulario */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Nombre", name: "nombre", type: "text", placeholder: "Nombre"},
            { label: "Apellido", name: "apellido", type: "text", placeholder: "Apellido" },
            { label: "Sexo", name: "sexo", type: "select", options: ["Masculino", "Femenino"] },
            { label: "Fecha de nacimiento", name: "fechaNacimiento", type: "date" },
            { label: "Tipo de emprendedor", name: "tipoEmprendedor", type: "select", options: ["Individual", "Empresa"] },
            { label: "Carnet UCA (favor colocar @uca.edu.sv)", name: "carnetUCA", type: "email", placeholder: "ej. 00117222@uca.edu.sv" },
            { label: "Facultad", name: "facultad", type: "select", options: ["Ingeniería", "Administración"] },
            { label: "Carrera", name: "carrera", type: "select", options: ["Ingeniería en Software", "Ingeniería Industrial"] },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-foreground">{field.label}:</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {field.options.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
                  placeholder={field.placeholder}
                  value={field.name !== "logo" ? formData[field.name] : undefined}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        </section>

        {/* Resto de campos del form */}
        {[
          { label: "¿Cuál es el nombre de tu emprendimiento?", name: "nombreEmprendimiento", type: "text", placeholder: "Nombre emprendimiento" },
          { label: "¿En que consiste tu emprendimiento en pocas palabras?", name: "descripcionEmprendimiento", type: "text", placeholder: "Se lo más breve posible"},
          { label: "¿En que sector opera tu emprendimiento?", name: "sectorEmprendimiento", type: "text", placeholder: "ej. reposteria"},
          { label: "¿Qué tipo de productos ofreces y colocarías en el espacio?", name: "productos", type: "text", placeholder: "Se específico"},
          { label: "¿En qué rango de precios se encuentran los productos que vendes?", name: "rangoPrecios", type: "text", placeholder: "ej. 20 - 30"},
          { label: "User de tus redes sociales de tu emprendimiento", name: "redesSociales", type: "text", placeholder: "ej. @croissant" },
          { label: "Número de tu telefono celular", name: "telefono", type: "text",placeholder: "Sin guiones" },
          { label: "Logo del emprendimiento", name: "logo", type: "file" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-foreground">{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-foreground"
              placeholder={field.placeholder}
              value={field.type !== "file" ? formData[field.name] : undefined}
              onChange={handleChange}
              required={field.type !== "file"}
            />
          </div>
        ))}

        <div className="flex items-center">
          <input
            type="checkbox"
            name="aceptoTerminos"
            className="h-4 w-4 text-primary border-gray-300 rounded"
            checked={formData.aceptoTerminos}
            onChange={handleChange}
          />
          <label className="ml-2 block text-sm text-foreground">Estoy de acuerdo con los términos y condiciones.</label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-secondary text-titles py-2 px-4 rounded-md hover:bg-title hover:text-background transition-colors"
          >
            ENVIAR FORMULARIO
          </button>
        </div>
      </form>
    </main>
  );
}
