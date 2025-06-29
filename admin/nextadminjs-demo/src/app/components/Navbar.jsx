"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { apiFetch } from "@/lib/api";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [loadingRole, setLoadingRole] = useState(true);
    const router = useRouter();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
    async function fetchRole() {
      try {
        const data = await apiFetch("/users/profile/role");
        if (data && data.role) {
          setRole(data.role);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Error al obtener el rol", err);
        setRole(null);
      } finally {
        setLoadingRole(false);
      }
    }
    fetchRole();
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      router.replace("/auth/login");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

    return (
        <>
            <nav className=" bg-primary text-background font-info flex justify-between items-center px-6 sm:px-6 py-4 h-20 w-full shadow-md">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl cursor-pointer hover:text-secondary">
                        ☰
                    </button>
                    <div className="flex items-center space-x-1">
                        <Image
                            src="/mercalogo.png"
                            alt="Logo"
                            width={45}
                            height={45}
                        />
                        <span className="text-2xl font-bold tracking-[-0.08em]">ercaduca</span>
                    </div>
                </div>
            </nav>

            {/*Sidebar call depending the role giving by the endpoint of the API */}
            {!loadingRole && (
            <Sidebar 
            role={role} 
            isOpen={isSidebarOpen} 
            onClose={closeSidebar}
            handleLogout={handleLogout}
            />
            )}
        </>
    );
}