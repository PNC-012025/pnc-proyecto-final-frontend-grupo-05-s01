"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const role = "user"; //it can be changed to "admin" to test other options in the menu

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

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

            {/*Sidebar call */}
            <Sidebar role={role} isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    );
}
