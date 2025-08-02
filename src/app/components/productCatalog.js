"use client";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context/cartContext";

const products = [
  {
    id: 1,
    nameLink: "Hidrolavadora Portatil 48V Alta Presion",
    name: "Hidrolavadora Portátil 48V Alta Presión",
    price: "250000",
    price_discount: "150000",
    images: [
      "/products/hidrolavadora.png",
      "/products/hidrolavadora.png",
      "/products/hidrolavadora.png",
      "/products/hidrolavadora.png",
    ],
    colors: ["negro"],
    description:
      "Descubre la solución perfecta para una limpieza potente y sin esfuerzo con esta hidrolavadora portátil inalámbrica de 48V. Gracias a su diseño compacto y ligero, puedes llevarla a cualquier lugar y limpiar con facilidad carros, motos, bicicletas, fachadas, ventanas y mucho más. Equipada con 2 baterías recargables de litio, te ofrece una autonomía ideal para trabajos prolongados sin necesidad de cables. Su potente presión elimina la suciedad más difícil en segundos. Incluye maletín de transporte y un set completo de accesorios: manguera de alta presión, espumador para jabón, boquillas intercambiables (incluida boquilla 6 en 1), filtro de agua y conectores rápidos. Ideal para uso doméstico o semiprofesional. Una herramienta práctica, eficiente y lista para usarse en cualquier momento. Incluye garantía de 30 días por parte del vendedor.",
  },
  {
    id: 2,
    nameLink: "Licuadora Portatil Recargable",
    name: "Licuadora Portátil Recargable",
    price: "90000",
    price_discount: "50000",
    images: [
      "/products/licuadora_recargable.png",
      "/products/licuadora_recargable.png",
      "/products/licuadora_recargable.png",
      "/products/licuadora_recargable.png",
    ],
    colors: ["rosado", "azul", "verde", "morado"],
    description:
      "Práctico vaso con licuadora integrada, ideal para preparar jugos y batidos frescos en cualquier lugar. Gracias a su filtro colador interno, puedes beber directamente desde el vaso sin preocuparte por pulpas o semillas. Su diseño portátil, liviano y recargable lo hace perfecto para llevar en la mochila, bolso o lonchera sin ocupar espacio ni generar molestias. Ideal para usar camino al trabajo, al gimnasio o durante una salida al parque. Solo agrega tu fruta y agua, y licúa en segundos estés donde estés. Fabricado en plástico resistente, con dimensiones aproximadas de 24 x 9 x 9 cm, es la solución perfecta para una vida activa y saludable.",
  },
  {
    id: 3,
    nameLink: "Filtro Purificador de Agua para Grifo",
    name: "Filtro Purificador de Agua para Grifo",
    price: "75000",
    price_discount: "50000",
    images: [
      "/products/filtro_agua_llave.png",
      "/products/filtro_agua_llave.png",
      "/products/filtro_agua_llave.png",
      "/products/filtro_agua_llave.png",
    ],
    colors: ["blanco"],
    description:
      "Purifica el agua de tu hogar fácilmente con este filtro para grifo adaptable, que incluye repuesto y 5 adaptadores para una instalación rápida en la mayoría de llaves de tipo redondo. Gracias a su sistema de 7 niveles de filtración, ayuda a eliminar impurezas como óxido, arena, sedimentos y reduce parcialmente el cloro, olores y metales pesados como plomo, arsénico, fluoruro y mercurio. El cartucho es lavable y tiene una duración de hasta 200 galones (dependiendo de la calidad del agua). Ideal para mejorar la calidad del agua de consumo diario. Fácil de instalar, reutilizable y económico.",
  },
  {
    id: 4,
    nameLink: "Masajeador Pistola 4 Puntas",
    name: "Masajeador Pistola 4 Puntas",
    price: "150000",
    price_discount: "80000",
    images: [
      "/products/pistola_cuatro_puntas.png",
      "/products/pistola_cuatro_puntas.png",
      "/products/pistola_cuatro_puntas.png",
      "/products/pistola_cuatro_puntas.png",
    ],
    colors: ["rojo", "negro", "verde", "gris"],
    description:
      "La Mini Pistola Masajeadora Muscular es tu mejor aliada para aliviar el estrés, la tensión y la fatiga muscular donde y cuando lo necesites. Gracias a su diseño compacto, ergonómico y liviano, es perfecta para usar en casa, en la oficina o después de una intensa rutina de ejercicio. Equipada con 4 cabezales intercambiables, puedes personalizar cada sesión de masaje según el área del cuerpo que desees tratar: músculos grandes, zonas sensibles o puntos de presión específicos. Su motor de alta potencia y tecnología de percusión penetra profundamente en los tejidos, promoviendo una mejor circulación sanguínea y recuperación muscular. Beneficios clave: ✅ Alivia contracturas, rigidez y dolores musculares ✅ Mejora la circulación y acelera la recuperación post-entrenamiento ✅ Fácil de usar, transportar y recargar ✅ Ideal para deportistas, fisioterapia o uso diario. Conviértelo en parte esencial de tu rutina de cuidado personal. Relájate, recupérate y rinde mejor con el poder de esta mini pistola de masaje profesional.",
  },
];

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [selectedColors, setSelectedColors] = useState({});
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSlug = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  return (
    <section className="px-4 md:px-0 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full md:w-1/2 mx-auto block px-4 py-2 border border-black placeholder-black text-black rounded-lg mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const price = parseInt(product.price);
            const discountPrice = parseInt(product.price_discount);
            const hasDiscount = discountPrice < price;
            const discountPercentage = hasDiscount
              ? Math.ceil(((price - discountPrice) / price) * 100)
              : 0;

            const selectedColor =
              selectedColors[product.id] || product.colors[0];

            return (
              <div
                key={product.id}
                className="relative border border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition flex flex-col justify-between"
              >
                {hasDiscount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold shadow-md z-10">
                    {discountPercentage}% OFF
                  </div>
                )}

                <div className="flex justify-center items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded-md mb-3"
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-sm">
                    ${discountPrice.toLocaleString("es-CO")}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through">
                      ${price.toLocaleString("es-CO")}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(product.id, color)}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                        selectedColor === color
                          ? "ring-2 ring-green-600 border-white"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          color === "negro"
                            ? "#000"
                            : color === "blanco"
                            ? "#fff"
                            : color === "rosado"
                            ? "#f871a0"
                            : color === "azul"
                            ? "#3b82f6"
                            : color === "verde"
                            ? "#10b981"
                            : color === "morado"
                            ? "#8b5cf6"
                            : color === "rojo"
                            ? "#ef4444"
                            : color === "gris"
                            ? "#6b7280"
                            : "#ccc",
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={`/${formatSlug(product.nameLink)}`}
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-green-600"
                  >
                    <EyeIcon className="h-5 w-5" />
                    Ver Detalles
                  </Link>

                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        color: selectedColor,
                        id: `${product.id}-${selectedColor}`,
                      })
                    }
                    className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md font-medium border cursor-pointer bg-white text-green-600 border-green-600"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
