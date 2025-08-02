"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import {
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { cartItems, cartCount, toggleItem } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" width={50} height={50} />
            <h1 className="text-sm md:text-lg font-semibold text-gray-600 hidden sm:inline">
              EUROPEATVSTORE
            </h1>
          </Link>
        </div>

        <nav className="space-x-4 hidden md:flex">
          <a
            href="#producto"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Producto
          </a>
          <a
            href="#beneficios"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Beneficios
          </a>
          <a
            href="#contacto"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/573147337602"
            className="hidden md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
          >
            Comprar por WhatsApp
          </a>

          <Link
            href="/favoritos"
            className="relative text-gray-600 hover:text-red-500"
            title="Favoritos"
          >
            <HeartIcon className="h-6 w-6" />
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative text-gray-600 hover:text-red-500"
              title="Carrito"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {showCart && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-md z-50 p-4">
                <h3 className="text-sm text-gray-400 font-bold mb-2">
                  Carrito
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Tu carrito está vacío</p>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-48 overflow-auto">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-2 flex justify-between items-center text-sm"
                      >
                        <div>
                          <p className="text-gray-600 font-medium">
                            {item.name}
                          </p>
                          <p className="text-red-600 font-semibold">
                            $
                            {parseInt(item.price_discount).toLocaleString(
                              "es-CO"
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleItem(item)}
                          className="text-gray-400 hover:text-red-500"
                          title="Eliminar del carrito"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/carrito"
                  className="block mt-4 w-full text-center bg-red-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Ver carrito
                </Link>
              </div>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-start">
            <div className="bg-white w-3/4 max-w-sm h-full p-6 flex flex-col gap-6 animate-slide-in-left">
              <div className="flex justify-between items-center mb-4">
                <img src="/logo.png" alt="logo" width={40} height={40} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <a
                href="#producto"
                className="text-gray-800 text-lg font-medium hover:text-red-600"
              >
                Producto
              </a>
              <a
                href="#beneficios"
                className="text-gray-800 text-lg font-medium hover:text-red-600"
              >
                Beneficios
              </a>
              <a
                href="#contacto"
                className="text-gray-800 text-lg font-medium hover:text-red-600"
              >
                Contacto
              </a>
              <a
                href="https://wa.me/573147337602"
                className="mt-auto bg-green-500 text-white py-2 rounded-md text-center font-medium hover:bg-green-600"
              >
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
