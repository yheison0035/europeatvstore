"use client";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Hidrolavadora Portatil 6 chorros",
    price: "$150.000",
    image: "/products/hidrolavadora.png",
  },
  {
    id: 2,
    name: "Aspiradora Turbo Clean",
    price: "$199.900",
    image: "/products/aspiradora.jpg",
  },
  {
    id: 3,
    name: "Plancha a Vapor Ultra",
    price: "$89.900",
    image: "/products/plancha.jpg",
  },
  {
    id: 4,
    name: "Extractor de Jugos PowerJuice",
    price: "$259.900",
    image: "/products/extractor.jpg",
  },
  {
    id: 5,
    name: "Licuadora Max Blend 2.0",
    price: "$149.900",
    image: "/products/licuadora.jpg",
  },
  {
    id: 6,
    name: "Cámara de Seguridad 360°",
    price: "$229.000",
    image: "/products/camara.jpg",
  },
  {
    id: 7,
    name: "Hidrolavadora Pro 3000",
    price: "$349.900",
    image: "/products/hidrolavadora.jpg",
  },
  {
    id: 8,
    name: "Aspiradora Turbo Clean",
    price: "$199.900",
    image: "/products/aspiradora.jpg",
  },
  {
    id: 9,
    name: "Plancha a Vapor Ultra",
    price: "$89.900",
    image: "/products/plancha.jpg",
  },
  {
    id: 10,
    name: "Extractor de Jugos PowerJuice",
    price: "$259.900",
    image: "/products/extractor.jpg",
  },
  {
    id: 11,
    name: "Licuadora Max Blend 2.0",
    price: "$149.900",
    image: "/products/licuadora.jpg",
  },
  {
    id: 12,
    name: "Cámara de Seguridad 360°",
    price: "$229.000",
    image: "/products/camara.jpg",
  },
];

export default function ProductCatalog() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-4 md:px-0 py-10 bg-gray">
      <div className="max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full md:w-1/2 mx-auto block px-4 py-2 border border-black placeholder-black text-black rounded-lg mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative border border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="absolute top-2 left-2 bg-red-500 text-red text-xs px-2 py-1 rounded-md font-semibold shadow-md z-10">
                50%
              </div>

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
                  {product.price}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  $300.000
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
