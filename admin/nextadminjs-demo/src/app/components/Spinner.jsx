"use client";

import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
              animation: "dot-spin 1.2s linear infinite",
              animationDelay: `${(i * 0.1).toFixed(1)}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes dot-spin {
          0%, 39%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
