"use client";

import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/edit-profile'); 
  };

  const userData = {
    name: "NOMBRE DE MARCA",
    email: "carlos@gmail.com",
    phone: "+503 7593 8185",
    sector: "Repositoria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "/user-default.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold font-titles text-foreground mb-6">MI PERFIL</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Encabezado con imagen */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              {/* Imagen del usuario */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src={userData.imageUrl} 
                  alt="Imagen de perfil" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/user-default.jpg'; // Imagen por defecto si hay error
                  }}
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-600">{userData.name}</h2>
            </div>
            <button 
              onClick={handleEditProfile}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
              EDITAR PERFIL
            </button>
          </div>

          {/* Información Comercial */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Mi información comercial</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-foreground">Sector:</p>
                <p className="font-medium">{userData.sector}</p>
              </div>
              <div>
                <p className="text-foreground">Número de teléfono:</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
              <div>
                <p className="text-foreground">Correo electrónico:</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Descripción de la marca */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Descripción marca:</h3>
            <p className="text-gray-600">
              {userData.description}
            </p>
          </section>

          <div className="border-t border-gray-200 my-6"></div>

        </div>
      </main>

    </div>
  );
};

export default MyProfile;