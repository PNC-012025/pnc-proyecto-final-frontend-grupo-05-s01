"use client";

import React from "react";
import ImageCard from "../components/RuleCard";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 flex flex-col items-center md:mt-[52px]">
          {/* Add responsive properties so in small screens just one image can be shown */}
          <div className="block sm:hidden">
            <ImageCard src="/ucamercaduca.png" alt="Stand with products" />
          </div>

          {/* In medium screens will be show two images side by side */}
          <div className="hidden sm:flex md:hidden flex-row gap-6">
            <ImageCard src="/ucamercaduca.png" alt="Stand with products" />
            <ImageCard src="/peopleatmerca.jpeg" alt="Customer service" />
          </div>

          {/* In complete screens all images will be shown at left side column */}
          <div className="hidden md:flex flex-col items-center space-y-10">
            <ImageCard src="/ucamercaduca.png" alt="Stand with products" />
            <ImageCard src="/peopleatmerca.jpeg" alt="Customer service" />
            <ImageCard src="/standwithproducts.jpg" alt="Stand with products" />
            <ImageCard src="/products.jpg" alt="Stand with products" />
          </div>
        </div>

        {/* item policies */}
        <div className="text-base leading-relaxed text-foreground font-info flex flex-col space-y-6 md:col-span-3">
          <h1 className="text-2xl font-bold text-title font-titles mb-5 text-center md:text-left">REGLAMENTO</h1>

          <ol className="list-decimal pl-5 space-y-3">
            <li>El emprendedor no podrá sobrepasar el espacio asignado ni interferir con productos o material publicitario.</li>
            <li>El emprendedor no podrá pagar por carteles sin autorización. Las colocaciones deben ser aprobadas.</li>
            <li>El emprendedor no podrá colocar productos no registrados previamente en la lista de productos.</li>
            <li>El emprendedor podrá colocar productos dentro del local solo en los días y horarios establecidos.</li>
            <li>El emprendedor debe ajustarse a los precios y tarifas reportadas.</li>
          </ol>

          <p className="text-sm bg-card p-2 rounded">
            <strong>NOTA:</strong> En caso de colocaciones que sobrepasen el tiempo o área asignada, se sancionará con el pago de un día adicional.
          </p>

          <ol start={6} className="list-decimal pl-5 space-y-3">
            <li>El emprendedor es responsable de revisar periódicamente su inventario.</li>
            <li>Las actividades no previstas serán resueltas por el Centro de Orientación.</li>
            <li>El emprendedor reconoce que está de acuerdo con los términos del contrato.</li>
            <li>El emprendedor se compromete a dejar el área limpia y ordenada al final del periodo asignado.</li>
            <li>Las instalaciones del emprendimiento dentro de la zona de Mercadito podrán ser removidas si se considera que afectan la experiencia del visitante.</li>
          </ol>

          <p className="text-sm text-justify bg-card p-2 rounded text-foreground">
            Importante: Si algún caso no se encuentra contemplado en este reglamento, será resuelto con base en lo estipulado por el Centro de Orientación Profesional.
          </p>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-title font-titles text-center md:text-left">Terminación contrato adelantado</h2>
            <ol className="list-decimal pl-5 space-y-3 font-info text-foreground text-justify">
              <li>El emprendedor no cumple con las políticas establecidas.</li>
              <li>Abandono del espacio sin informar al Centro de Orientación.</li>
              <li>Incumplimiento en los pagos o repetidas faltas a las fechas establecidas.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
