"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCartIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "@/context/cartContext";

const products = [
  {
    id: 1,
    name: "Hidrolavadora Portatil 6 chorros",
    price: "250000",
    price_discount: "150000",
    image: "/products/hidrolavadora.png",
  },
  {
    id: 2,
    name: "Licuadora Portatil Recargable",
    price: "80000",
    price_discount: "50000",
    image: "/products/licuadora_recargable.png",
  },
  {
    id: 3,
    name: "Filtro Purificador de Agua para Llave",
    price: "80000",
    price_discount: "50000",
    image: "/products/filtro_agua_llave.png",
  },
  {
    id: 4,
    name: "Masajeador Pistola 4 Puntas",
    price: "150000",
    price_discount: "80000",
    image: "/products/pistola_cuatro_puntas.png",
  },
];

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const { toggleItem, isInCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSlug = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

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
            const inCart = isInCart(product.id);

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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded-md mb-3"
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {product.name}
                </h3>

                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-sm">
                    ${discountPrice.toLocaleString("es-CO")}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through">
                      ${price.toLocaleString("es-CO")}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={`/producto/${formatSlug(product.name)}`}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-green-600"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Comprar ya
                  </Link>

                  <button
                    onClick={() => toggleItem(product)}
                    className={`flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md font-medium border ${
                      inCart
                        ? "bg-green-100 text-green-600 border-green-600"
                        : "bg-white text-green-600 border-green-500 hover:bg-green-100"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <CheckIcon className="h-5 w-5" />
                        En carrito
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-5 w-5" />
                        Agregar al carrito
                      </>
                    )}
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
