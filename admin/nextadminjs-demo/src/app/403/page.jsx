"use client";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-primary">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-xl text-foreground mt-4">Acceso denegado.</p>
      <p className="text-sm text-muted mt-2">No tienes permiso para ver esta página.</p>
      <Link href="/auth/login" className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-title">
        Ir a Login
      </Link>
    </div>
  );
}
