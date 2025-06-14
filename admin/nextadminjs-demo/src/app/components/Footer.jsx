"use client";

export default function Footer() {
    return (
      <footer className="bg-primary text-background py-6 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4 md:space-y-0">
          <div>
            <p className="text-l font-bold font-titles">
              Universidad Centroamericana José Simeón Cañas
            </p>
          </div>
  
    
          <div>
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=centro.profesional@uca.edu.sv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background font-titles hover:underline block"
            >
              Centro.profesional@uca.edu.sv
            </a>
          </div>
  
          <div>
            <p className="text-sm font-titles">2210-6600, ext:462</p>
          </div>
        </div>
      </footer>
    );
  }
  