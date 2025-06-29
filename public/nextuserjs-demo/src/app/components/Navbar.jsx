"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeRedirect = () => {
    router.push("/home");
    setIsMobileMenuOpen(false);
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
    setIsMobileMenuOpen(false);
  };

  const handleBrandRedirect = () => {
    router.push("/brand");
    setIsMobileMenuOpen(false);
  };

  const handleContactRedirect = () => {
    router.push("/contact");
    setIsMobileMenuOpen(false);
  };

  const handleFormRedirect = () => {
    router.push("/form");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-background font-info px-4 sm:px-6 py-4 w-full">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center flex-shrink-0 min-w-0">
          <img
            src="/mercalogo.png"
            alt="Logo Mercaduca"
            className="h-12 mr-2 sm:h-14"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-[-0.08em] whitespace-nowrap">
            ercaduca
          </span>
        </div>

        {/*Para pantallas grandes */}
        <div className="hidden lg:flex items-center flex-wrap gap-6 mt-4 lg:mt-0">
          <ul className="flex flex-wrap gap-6 text-sm sm:text-base">
            <li>
              <a onClick={handleHomeRedirect} className="hover:text-secondary cursor-pointer">
                INICIO
              </a>
            </li>
            <li>
              <a onClick={handleBrandRedirect} className="hover:text-secondary cursor-pointer">
                MARCAS
              </a>
            </li>
            <li>
              <a onClick={handleFormRedirect} className="hover:text-secondary cursor-pointer">
                SOLICITUD DE ALQUILER
              </a>
            </li>
            <li>
              <a onClick={handleContactRedirect} className="hover:text-secondary cursor-pointer">
                CONTÁCTANOS
              </a>
            </li>
          </ul>
          <button
            onClick={handleLoginRedirect}
            className="bg-secondary text-title px-4 py-2 rounded-lg hover:bg-hover hover:text-background transition"
          >
            INICIAR SESIÓN
          </button>
        </div>

        {/* Uso de boton hamburguesa para panatallas medianas y pequeñas */}
        <div className="lg:hidden flex items-center ml-auto mt-4 lg:mt-0">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-background hover:text-secondary focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu movil */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} mt-4`}
        id="mobile-menu"
      >
        <div className="px-4 pb-4 space-y-2 bg-primary">
          <a onClick={handleHomeRedirect} className="block hover:text-secondary cursor-pointer">
            INICIO
          </a>
          <a onClick={handleBrandRedirect} className="block hover:text-secondary cursor-pointer">
            MARCAS
          </a>
          <a onClick={handleFormRedirect} className="block hover:text-secondary cursor-pointer">
            SOLICITUD DE ALQUILER
          </a>
          <a onClick={handleContactRedirect} className="block hover:text-secondary cursor-pointer">
            CONTÁCTANOS
          </a>
          <button
            onClick={handleLoginRedirect}
            className="w-full bg-secondary text-title px-4 py-2 rounded-lg hover:bg-hover hover:text-background transition"
          >
            INICIAR SESIÓN
          </button>
        </div>
      </div>
    </nav>
  );
}
