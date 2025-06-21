"use client";
import { useState } from "react";
import Link from "next/link";
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
    <nav className="bg-primary text-background font-info px-6 py-4 h-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/mercalogo.png"
            alt="Logo Mercaduca"
            className="h-14 mr-1"
          />
          <span className="text-2xl font-bold tracking-[-0.08em]">ercaduca</span>
        </div>

        {/* Menu para dispositivos grandes */}
        <div className="hidden md:flex items-center space-x-15">
          <ul className="flex space-x-15">
            <li>
              <a 
                onClick={handleHomeRedirect}
                className="hover:text-secondary transition-colors cursor-pointer">
                INICIO
              </a>
            </li>
            <li>
              <a 
                onClick={handleBrandRedirect}
                className="hover:text-secondary transition-colors cursor-pointer">
                MARCAS
              </a>
            </li>
            <li>
              <a 
                onClick={handleFormRedirect}
                className="hover:text-secondary transition-colors cursor-pointer">
                SOLICITUD DE ALQUILER
              </a>
            </li>
            <li>
              <a 
                onClick={handleContactRedirect}
                className="hover:text-secondary transition-colors cursor-pointer">
                CONTÁCTANOS
              </a>
            </li>
          </ul>
          <button 
          onClick={handleLoginRedirect}
          className="bg-secondary text-title px-4 py-2 rounded-lg hover:bg-hover hover:text-background transition-colors">
            INICIAR SESIÓN
          </button>
        </div>

        {/* menu movil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-background hover:text-secondary focus:outline-none"
          >
            ☰ 
          </button>
        </div>
      </div>

      {/* Menu movil */}
      <div
        className={`absolute top-20 left-0 w-full md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-2 bg-primary">
          <a 
          onClick={handleHomeRedirect}
          className="block text-background hover:text-secondary transition-colors cursor-pointer">
            INICIO
          </a>
          <a 
            onClick={handleBrandRedirect}
            className="block text-background hover:text-secondary transition-colors cursor-pointer">
            MARCAS
          </a>
          <a 
            onClick={handleFormRedirect}
            className="block text-background hover:text-secondary transition-colors cursor-pointer">
            SOLICITUD DE ALQUILER
          </a>
          <a 
          onClick={handleContactRedirect}
          className="block text-background hover:text-secondary transition-colors cursor-pointer">
            CONTÁCTANOS
          </a>
          <button 
             onClick={handleLoginRedirect}
             className="w-full bg-secondary text-title px-4 py-2 mt-2 rounded-lg hover:bg-hover hover:text-background transition-colors">
            INICIAR SESIÓN
          </button>
        </div>
      </div>
    </nav>
  );
}
