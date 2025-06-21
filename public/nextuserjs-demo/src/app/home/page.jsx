"use client";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdOutlineApproval } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineSolution } from "react-icons/ai";



// Componente reutilizable para cada paso de la seccion de proceso de solicitud
const Step = ({ Icon, text }) => {
  if (!Icon || typeof Icon !== "function") {
    console.error("El icono debe ser un componente valido de React");
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <Icon className="text-5xl mb-4" />
      <p className="text-sm font info text-center">{text}</p>
    </div>
  );
};

export default function Home() {


  return (
    <main className="flex-grow">
      <section className="w-full">
        <div className="w-full">
          <img
            src="/mainimage.jpg"
            alt="Mercaduca Inauguración"
            className="w-full max-h-[576px] h-auto object-cover"
          />
        </div>

        <div className="text-center py-6 bg-background px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs md:text-sm lg:text-base text-foreground font-info">
              "Hay muchas malas razones para empezar una empresa. Pero solo hay una buena razón y creo que sabes cuál es: para cambiar el mundo."
            </p>
            <p className="font-semibold font-info text-foreground-800 mt-2 text-xs md:text-sm">
              Phil Libin - Fundador de Evernote.
            </p>
          </div>
        </div>
      </section>

      {/* Seccion MERCADUCA */}
      <section className="py-10 bg-background">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-title font-titles mb-4 text-center">
              ¿Qué es MERCADUCA?
            </h2>
            <div className="text-foreground font-info text-base leading-relaxed text-justify space-y-4">
            <p>
          Mercaduca es un espacio creado por y para la comunidad de la Universidad Centroamericana (UCA). Aquí, estudiantes, empleados y graduados tienen la oportunidad de promover y vender productos únicos que reflejan su creatividad, esfuerzo y espíritu emprendedor.
        </p>
        <p>
          Desde alimentos caseros y artesanías hasta servicios innovadores, Mercaduca busca ser un puente que conecta el talento y la pasión de nuestra comunidad universitaria con quienes valoran la calidad y el compromiso local.
        </p>
      </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/products.jpg" 
              alt="Grupo Mercaduca"
              className="w-full max-w-md max-h-[400px] border border-primary rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

    {/* Seccion para el proceso de solicitud */}
      <section className="py-10 bg-primary text-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-titles font-bold mb-6">Proceso de solicitud</h2>
          <p className="text-base font-info mb-8">
            El proceso para tener tu puesto en Mercaduca es el siguiente:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Paso 1: Form de solicitud*/}
          <Step Icon={AiOutlineSolution} text="Completa el formulario de solicitud" /> 
             {/* Paso 2: esperar resolucion */}
          <Step Icon={MdOutlineApproval} text="Espera la respuesta por parte del COP" />
              {/* Paso 3: credenciales by email */}
          <Step
              Icon={FaEnvelopeOpenText}
              text="Si tu solicitud fue aprobada, se te enviarán tus credenciales"
          />
            {/* Paso 4: siguientes pasos por correo*/}
          <Step
              Icon={HiOutlineMailOpen}
              text="El resto de pasos se te indicará por correo electrónico"
          />
          </div>
        </div>
      </section>

        {/* Sección de marcas participantes */}
<section className="py-10 bg-background">
  <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
    {/* Imagen de marcas participantes */}
    <div className="lg:w-1/2 flex justify-center">
      <img
        src="/productsatstand.jpg"
        alt="Marcas participantes en Mercaduca"
        className="w-full max-w-md max-h-[400px] border border-primary rounded-lg shadow-lg object-cover"
      />
    </div>

  
    <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
      <h2 className="text-3xl font-bold text-title font-titles mb-4 text-center lg:text-center">
        ¿Quieres conocer nuestras marcas participantes actuales?
      </h2>

      <div className="text-foreground font-info text-base leading-relaxed text-justify space-y-4">
            <p>
        En Mercaduca, nos enorgullecemos de contar con una diversidad de marcas
        que representan el talento, la creatividad y la pasión de nuestra comunidad universitaria. 
        Desde alimentos artesanales y artículos de diseño único hasta servicios innovadores,
        estas marcas ofrecen productos de alta calidad, hechos con dedicación y cuidado.
        Conocerlas no solo es apoyar su crecimiento, sino también ser parte de una red que 
        valora el emprendimiento y el compromiso local.
           </p>
            <p>
          Explora sus ofertas y descubre lo que las hace tan especiales. ¡Hecha un vistazo y apoya a nuestros emprendedores!
        </p>
      </div>


    </div>
  </div>
</section>

    </main>
  );
}
