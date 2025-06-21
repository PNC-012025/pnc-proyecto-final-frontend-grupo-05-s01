"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import CardProd from "../../components/Cardprod";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const BrandPage = () => {
    const { id } = useParams();

    const [brandInfo, setBrandInfo] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (id) {
            const brandsData = {
                1: {
                    logo: "/croisant.png",
                    name: "LE CROISSANT",
                    description: "La repostería francesa (pâtisserie française) es la pastelería típica de este país europeo, considerada una de las más importantes ya que ha influenciado enormemente en otras reposterías del mundo.[1]​ El santo patrón de los reposteros franceses es St. Michel, celebrado el 29 de septiembre. Se cree que la repostería francesa surgió como tal a lo largo de la Edad Media, cuando se comienza a distinguir el oficio de pastelero (pâtissier) del cocinero,[2]​ y en 1556 nacería la primera academia de pasteleros que reglamentaría el aprendizaje del arte de la repostería.[3]​ Sin embargo, cabe decir que en la Antigua Roma ya existía el oficio de pastillariorum, y es que la repostería francesa nunca ha dejado de evolucionar, conociendo nuevos ingredientes y nuevas técnicas. ",
                    socialLinks: { facebook: "#", instagram: "#" },
                    products: [
                        { id: 1, image: "/croisant.png", productName: "Croissant", productPrice: "$40", description: "Delicioso croissant con relleno de chocolate y vainilla, bañado en crema chantilli y ademas contiene avellana en las orillas." },
                        { id: 2, image: "/croisant.png", productName: "Pan", productPrice: "$40", description: "Pan recién hhhhhhh" },
                        { id: 3, image: "/croisant.png", productName: "Pan", productPrice: "$40", description: "Pan recién horneado." },
                        { id: 4, image: "/croisant.png", productName: "Pan", productPrice: "$40", description: "Pan recién horneado." },
                    ],
                },

                2: {
                    logo: "/products.jpg",
                    name: "CALVIN KLEIN",
                    description: "Ropa y accesorios de lujo.",
                    socialLinks: { facebook: "#", instagram: "#" },
                    products: [
                        { id: 3, image: "/products.jpg", productName: "Camisa", productPrice: "$40", description: "Camisa elegante de alta calidad." },
                        { id: 4, image: "/products.jpg", productName: "Perfume", productPrice: "$40", description: "Fragancia exclusiva." },
                    ],
                },
                3: {
                    logo: "/uca.jpg",
                    name: "McDonald's",
                    description: "Comida rápida icónica.",
                    socialLinks: { facebook: "#", instagram: "#" },
                    products: [
                        { id: 5, image: "/uca.jpg", productName: "Big Mac", productPrice: "$40", description: "Hamburguesa clásica de McDonald's." },
                        { id: 6, image: "/uca.jpg", productName: "Papas fritas", productPrice: "$40", description: "Crujientes y deliciosas." },
                    ],
                },

            };

            const brandData = brandsData[id];
            if (brandData) {
                setBrandInfo(brandData);
                setProducts(brandData.products);
            }
        }
    }, [id]);

    if (!brandInfo.name) return <p>Cargando...</p>;

    return (
        <div className="px-4 lg:px-8 py-10 bg-background">
            {/* Encabezado de la brand: nombre, imagen, descripcion*/}
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-2xl md:text-3xl text-title font-titles font-semibold uppercase">{brandInfo.name}</h1>
                    <p className="text-foreground mt-4 font-info leading-relaxed">{brandInfo.description}</p>
                    <div className="flex justify-center lg:justify-start mt-6 gap-6 text-2xl">
                        <a
                            href={brandInfo.socialLinks.facebook}
                            target="_blank"
                            className="text-foreground hover:text-title transition-transform"
                        >
                            <FaFacebook />

                        </a>
                        <a
                            href={brandInfo.socialLinks.instagram}
                            target="_blank"
                            className="text-foreground hover:text-title transition-transform"
                        >
                            <FaInstagram />
                        </a>
                    </div>

                    {/* Logo */}
                </div>
                <div className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 px-4 lg:px-8">
                    <img
                        src={brandInfo.logo}
                        alt={brandInfo.name}
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>

            {/* Brand products*/}
            <h2 className="text-center font-titles text-title text-2xl font-bold mt-10 mb-4 uppercase tracking-wide">
                CATÁLOGO
            </h2>
            <p className="max-w-5xl mx-auto mb-10 px-1 text-center lg:text-justify leading-relaxed text-foreground">
                Descubre nuestra exclusiva colección de productos seleccionados cuidadosamente para ofrecerte la mejor calidad y diseño. Cada artículo en nuestro catálogo refleja innovación y estilo, pensado para satisfacer tus necesidades y superar tus expectativas. Navega a través de nuestras categorías y encuentra justo lo que buscas, con la confianza de contar con garantía y un excelente servicio al cliente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {products.map((product) => (
                    <CardProd
                        key={product.id}
                        image={product.image}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        description={product.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrandPage;
