"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import Counter from "@/components/product/counter";

const products = [
  {
    id: 1,
    nameLink: "Hidrolavadora Portatil 48V Alta Presion",
    name: "Hidrolavadora Portátil 48V Alta Presión",
    price: "250000",
    price_discount: "150000",
    images: [
      "/products/hidrolavadora.png",
      "/products/licuadora_recargable.png",
      "/products/filtro_agua_llave.png",
      "/products/pistola_cuatro_puntas.png",
    ],
    colors: ["negro"],
    quantity: 10,
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
      "/products/hidrolavadora.png",
      "/products/filtro_agua_llave.png",
      "/products/pistola_cuatro_puntas.png",
    ],
    colors: ["rosado", "azul", "verde", "morado"],
    quantity: 8,
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
      "/products/licuadora_recargable.png",
      "/products/hidrolavadora.png",
      "/products/pistola_cuatro_puntas.png",
    ],
    colors: ["blanco"],
    quantity: 15,
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
      "/products/filtro_agua_llave.png",
      "/products/hidrolavadora.png",
      "/products/licuadora_recargable.png",
    ],
    colors: ["rojo", "negro", "verde", "gris"],
    quantity: 20,
    description:
      "La Mini Pistola Masajeadora Muscular es tu mejor aliada para aliviar el estrés, la tensión y la fatiga muscular donde y cuando lo necesites. Gracias a su diseño compacto, ergonómico y liviano, es perfecta para usar en casa, en la oficina o después de una intensa rutina de ejercicio. Equipada con 4 cabezales intercambiables, puedes personalizar cada sesión de masaje según el área del cuerpo que desees tratar: músculos grandes, zonas sensibles o puntos de presión específicos. Su motor de alta potencia y tecnología de percusión penetra profundamente en los tejidos, promoviendo una mejor circulación sanguínea y recuperación muscular. Beneficios clave: ✅ Alivia contracturas, rigidez y dolores musculares ✅ Mejora la circulación y acelera la recuperación post-entrenamiento ✅ Fácil de usar, transportar y recargar ✅ Ideal para deportistas, fisioterapia o uso diario. Conviértelo en parte esencial de tu rutina de cuidado personal. Relájate, recupérate y rinde mejor con el poder de esta mini pistola de masaje profesional.",
  },
];

export default function DetailProduct() {
  const { name } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { isInCart, toggleItem } = useCart();

  useEffect(() => {
    if (name) {
      const found = products.find(
        (p) => p.nameLink.toLowerCase().replaceAll(" ", "-") === name
      );
      setProduct(found);
      if (found?.images?.length) {
        setMainImage(found.images[0]);
      }
      if (found?.colors?.length === 1) {
        setSelectedColor(found.colors[0]);
      }
    }
  }, [name]);

  if (!product) {
    return (
      <p className="text-center py-10 text-gray-600">Cargando producto...</p>
    );
  }

  const discount = Math.round(
    ((parseInt(product.price) - parseInt(product.price_discount)) /
      parseInt(product.price)) *
      100
  );

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Por favor selecciona un color antes de continuar.");
      return;
    }
    const item = { ...product, quantity: count, color: selectedColor };
    toggleItem(item);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 bg-white px-8">
      <div>
        <div className="border rounded-xl overflow-hidden aspect-square">
          <Image
            src={mainImage}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              width={80}
              height={80}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                img === mainImage ? "ring-2" : "hover:ring"
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold uppercase mb-2">
          -{discount}% OFF
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <p className="text-2xl font-bold text-red-600">
            ${parseInt(product.price_discount).toLocaleString("es-CO")}
          </p>
          <p className="text-gray-400 line-through text-lg">
            ${parseInt(product.price).toLocaleString("es-CO")}
          </p>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-1 text-black">Cantidad:</p>
          <Counter
            quantity={product.quantity}
            count={count}
            setCount={setCount}
          />
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-1 text-black">Color:</p>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`capitalize border cursor-pointer text-gray-800 px-3 py-1 rounded-full ${
                  selectedColor === color
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="text-gray-700 leading-relaxed mb-6">
          <p>
            {showFullDesc
              ? product.description
              : product.description.slice(0, 180) + "..."}
          </p>
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-blue-900 mt-2 cursor-pointer hover:underline"
          >
            {showFullDesc ? "Ver menos" : "Ver más"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-semibold"
          >
            <PlusIcon className="h-5 w-5" />
            Agregar al carrito
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              router.push("/carrito");
            }}
            className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm font-semibold"
          >
            <CheckCircleIcon className="h-5 w-5" />
            ¡Lo quiero!
          </button>
        </div>
      </div>
    </div>
  );
}
