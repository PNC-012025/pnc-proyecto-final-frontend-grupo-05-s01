"use client";

import React from "react";
import Link from "next/link";

const CardProd = ({ image, productName, productPrice, description, linkTo }) => {
  return (
    <Link href={linkTo}>
      <div className="flex bg-white border rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
        {/* Imagen del producto */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-4 py-2 text-left">
          <h3 className="text-lg font-semibold text-title truncate">{productName}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="mt-2 text-sm font-medium text-green-700">{productPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProd;
