"use client";
import { FaUser } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock, FaMapMarkerAlt, FaFileAlt, FaUserCheck } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import ProductInfo from "../components/Products";

{/*Component for each step of restock process */}
const Step = ({ Icon, title, text, children }) => {
  if (!Icon || typeof Icon !== "function") {
    console.error("El icono debe ser un componente válido de React");
    return null;
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="text-4xl mb-3" />
      <p className="text-sm font-info font-bold mb-1">{title}</p>
      <p className="text-sm font-info">{text}</p>
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex-grow">
      {/*Merca image section*/}
      <section className="w-full">
        <div className="w-full">
          <img
            src="/mainimage.jpg"
            alt="Mercaduca Inauguración"
            className="w-full max-h-[576px] h-auto object-cover"
          />
        </div>
      </section>

      {/* Conditions to renovate contract as an emprendedor*/}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-titles font-bold text-title text-center mb-2">
            Duración del contrato
          </h2>
          <p className="text-base font-info text-center mb-10 text-foreground">
            El período de participación en el local emprendedor es de (3) tres meses
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-left font-info">
              <p className="text-base text-foreground mb-4">
                Se evaluará cada caso para determinar la continuidad <br />
                dentro del local, de acuerdo a cuatro criterios:
              </p>
              <ul className="space-y-4">
                {[
                  "Top Seller y/o PV innovadoras",
                  "Poca demanda categoría",
                  "Participación y apoyo actividades",
                  "Participación y apoyo actividades",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="bg-primary text-background rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-base text-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 w-full flex justify-center">
              <img
                src="/mercatnight.jpg"
                alt="Mercaduca at night"
                className="w-full md:w-[500px] rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Restock section */}
      <section className="py-16 bg-primary text-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-titles font-black text-center mb-10">
            Inventario productos
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2 text-left">
              <p className="flex items-center gap-2 text-base font-info mb-4">
                <FaUser className="text-base" />
                <strong>Cada emprendedor podrá:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-3 text-base font-info leading-relaxed">
                <li>Contar con un máximo de 7 categorías de productos por precio.</li>
                <li>Renovar su producto en el día y horario establecido.</li>
              </ol>
            </div>

            <div className="lg:w-1/2 w-full flex justify-center">
              <img
                src="/prodcategory.png"
                alt="Categorias de productos"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/*Product register section  */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-titles font-bold text-title mb-2">
            Registro de producto
          </h2>
          <p className="text-base md:text-lg font-info mb-10 text-foreground">
            Existen dos casos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductInfo
              image="/snoopy.png"
              title="Productos en general:"
              items={[
                "Nombre del emprendimiento",
                "Precio del producto",
              ]}
            />

            <ProductInfo
              image="/biscuits.jpg"
              title="Snacks y alimentos empacados:"
              items={[
                "Nombre del emprendimiento",
                "Precio del producto",
                "Fecha de elaboración del producto",
                "Fecha de expiración",
              ]}
            />
          </div>
        </div>
      </section>

      {/*Steps to restock section */}
      <section
        className="relative py-16 bg-cover bg-center bg-no-repeat text-background"
        style={{ backgroundImage: "url('/homebackground.png')" }}
      >
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-titles font-bold mb-8">Renovación Stock</h2>

          {/* Informacion sobre horarios/lugar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-center">
            <div className="flex flex-col font-info items-center gap-4">
              <div className="flex items-center gap-2">
                <FaCalendarDays className="text-lg" />
                <p className="text-base font-bold">Horarios:</p>
              </div>
              <div className="space-y-2">
                <p className="text-base">Viernes de 2:30 p.m - 5:00 p.m</p>
                <p className="text-base">Sábado de 9:00 a.m - 11:30 a.m</p>
              </div>
            </div>

            <div className="flex flex-col font-info items-center gap-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-lg" />
                <p className="text-base font-bold">Lugar:</p>
              </div>
              <div className="space-y-2">
                <p className="text-base">Centro de Orientación Profesional</p>
                <p className="text-base">Por orden de llegada</p>
              </div>
            </div>
          </div>

          {/*steps to restock products*/}
          <p className="text-2xl font-titles font-bold mb-4 text-center">Paso a paso:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-info gap-6">
            <Step Icon={FaFileAlt} title="1. Completar y enviar" text="Ficha de registro de productos.">
              <button className="mt-4 bg-secondary text-title px-4 py-2 rounded-md font-info font-semibold text-sm hover:bg-title hover:text-background transition">
                Ficha de registro
              </button>
            </Step>
            <Step Icon={FaUserCheck} title="2. Llegar al COP" text="Indicar que se ha enviado la ficha." />
            <Step Icon={BsSearch} title="3. Revisión" text="Se validará físicamente el inventario por parte del equipo de emprendimiento." />
            <Step Icon={MdDone} title="4. ¡Listo!" text="Puedes llevar tus productos a Mercaduca para acomodarlos en tu espacio." />
          </div>
        </div>
      </section>

      {/*Rent payment frecuency section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/rentpayment.png"
              alt="Reference contract and payment"
              className="w-full max-w-sm object-contain"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-titles font-semibold text-title mb-4">
              Pago alquiler
            </h3>
            <div className="text-base font-info text-foreground mb-6 leading-relaxed space-y-6">
              <p>
                Los emprendedores podrán realizar el pago de la mensualidad únicamente con el método de pago de EFECTIVO en las instalaciones del Centro de Orientación Profesional (COP).
              </p>
              <p>
                Para conocer las fechas de vencimiento, estado y comprobante de pago de las mensualidades, consultar sección de talonario.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}