"use client";
import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaFileAlt,
  FaClipboardList,
  FaUserFriends,
  FaExclamationCircle,
  FaMoneyCheckAlt,
  FaStore,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const icons = {
  Inicio: <FaHome />,
  "Mis productos": <FaBoxOpen />,
  "Re-stock": <FaStore />,
  Contrato: <FaFileAlt />,
  Talonarios: <FaMoneyCheckAlt />,
  Reglamento: <FaExclamationCircle />,
  Solicitudes: <FaClipboardList />,
  Emprendedores: <FaUserFriends />,
  "Mi perfil": <FaUser />,
  "Cerrar sesión": <FaSignOutAlt />,
};

export default function Sidebar({ role, isOpen, onClose, handleLogout }) {
  const commonItems = [
    { label: "Inicio", href: "/home" },
    { label: "Re-stock", href: "/restock" },
    { label: "Talonarios", href: "/talonarios" },
    { label: "Reglamento", href: "./policies" },
  ];

  const userItems = [
    { label: "Mis productos", href: "/productos" },
    { label: "Contrato", href: "/contrato" },
  ];

  const adminItems = [
    { label: "Solicitudes", href: "/solicitudes" },
    { label: "Emprendedores", href: "/entrepreneurs" },
  ];

  const menuItems = [
    ...commonItems, 
    ...(role === "ROLE_EMPRENDEDOR" ? userItems : []),
    ...(role === "ROLE_ADMIN" ? adminItems : []),
];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-card shadow-md rounded-tr-2xl rounded-br-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div 
        className="h-20 px-4 flex items-center gap-3 border-b font-info cursor-pointer font-bold text-primary hover:text-title"
        onClick={onClose}
      >
        <img
          src="/mercalogo.png"
          alt="Logo Mercaduca"
          className="w-10 h-10 rounded-full object-cover"
        />
        Menu
      </div>

      <ul className="p-4 space-y-6 font-info text-primary">
        {menuItems.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              onClick={onClose}
              className="flex items-center space-x-3 hover:text-title transition-colors"
            >
              <span className="text-lg">{icons[label]}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}

        <li>
          <Link
            href="/myprofile"
            onClick={onClose}
            className="flex items-center space-x-3 hover:text-title transition-colors"
          >
            <span className="text-lg">{icons["Mi perfil"]}</span>
            <span>Mi perfil</span>
          </Link>
        </li>

        <li>
          <div
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="flex items-center space-x-3 hover:text-title transition-colors cursor-pointer"
          >
            <span className="text-lg">{icons["Cerrar sesión"]}</span>
            <span>Cerrar sesión</span>
          </div>
        </li>
      </ul>

      <div className="absolute bottom-0 w-full p-4 text-xs text-center text-primary hover:text-title cursor-pointer border-t">
        UCA, Derechos reservados, 2025
      </div>
    </div>
  );
}
