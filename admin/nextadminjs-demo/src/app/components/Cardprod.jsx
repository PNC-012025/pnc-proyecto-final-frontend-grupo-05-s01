import React from "react";

const CardProd = ({ image, productName, productPrice, description }) => {
  return (
    <div className="flex border rounded-2xl border-border-card shadow-xl p-4 w-full max-w-[400px] mx-auto bg-card">
      <div className="w-[150px] h-[163px] flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden bg-card">
        <img src={image} alt={productName} className="h-full w-full object-cover" />
      </div>

      {/* Contenedor para el texto: nombre del prod, precio, descripcion*/}
      <div className="flex-1 flex flex-col items-start justify-start pl-4">
        <h3 className="text-lg font-titles text-title font-bold">{productName}</h3>
        <p className="text-sm text-foreground font-info mt-2">{productPrice}</p>
        <p className="text-sm font-info text-foreground mt-2 w-full max-h-[100px] overflow-y-auto break-words">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardProd;
