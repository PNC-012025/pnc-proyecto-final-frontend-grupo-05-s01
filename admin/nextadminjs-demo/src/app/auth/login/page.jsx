"use client";

import React, { useState } from "react";
import Image from "next/image";
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
      });

      window.location.href = '/home';
    } catch (err) {
      setError(err.message || 'Error inesperado al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-background-primary dark:bg-background-tertiary flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image
            src="/icon.png"
            alt="Logo de Mercaduca"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-titles font-bold text-center text-title">
          ¡HOLA DE NUEVO!
        </h1>
        <p className="text-sm text-center font-info text-foreground mb-6">
          Ingresa tus datos para empezar
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-title text-sm text-center">{error}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium font-info text-foreground mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@correo.com"
              className="w-full px-4 py-2 border font-info rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background-secondary dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-info font-medium text-foreground mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-title font-info py-2 rounded-lg shadow hover:bg-title transition hover:text-background"
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
  );
}
