"use client";

import React from "react";
import Image from "next/image";

export default function ImageCard({ src, alt }) {
  return (
    // Defining the styles for the card in policy page
    <div className="bg-background p-2 rounded-xl shadow-md border border-border-card w-[260px] mx-auto transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={240}
          height={160}
          className="object-cover w-full h-[160px]"
        />
      </div>
    </div>
  );
}
