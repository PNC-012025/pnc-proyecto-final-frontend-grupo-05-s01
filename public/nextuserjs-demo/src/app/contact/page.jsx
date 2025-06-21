"use client";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center p-4">
      <section className="bg-background shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg sm:max-w-2xl md:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold font-titles text-center text-title mb-6">
          CONTÁCTANOS
        </h1>

        {/* Informacion de contacto del cop */}
        <div className="space-y-6 font-info text-foreground">
          <div>
            <h2 className="text-lg sm:text-xl font-titles font-semibold text-title mb-2">
              INFORMACIÓN:
            </h2>
            <p className="text-sm sm:text-base">
              Para consultas puedes escribirnos a:{" "}
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=centro.profesional@uca.edu.sv"
                className="text-primary hover:text-title underline"
              >
                centro.profesional@uca.edu.sv
              </a>{" "}
              o llamarnos al:{" "}
              <span className="text-primary">2210-6600, ext: 462</span>
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-titles font-semibold text-title">
              HORARIOS:
            </h2>
            <p className="text-sm sm:text-base">
              Lunes a viernes: 8:00 a.m. - 12:00 m. y 2:00 p.m. - 6:00 p.m.
            </p>
            <p className="text-sm sm:text-base">Sábados: 8:00 a.m. - 12:00 m.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <Image
            src="/coplogo.jpg"
            alt="Centro de Orientación Profesional - UCA"
            width={120}
            height={120}
            className="rounded-md"
          />
          <p className="text-sm sm:text-base text-foreground mt-4 text-center">
            Centro de Orientación Profesional
          </p>
        </div>
      </section>
    </main>
  );
}
