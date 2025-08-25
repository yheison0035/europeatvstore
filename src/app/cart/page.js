"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import Counter from "@/components/product/counter";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import formatSlug from "@/customs/formats";
import Checkout from "@/components/checkout/checkout";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      const key = `${item.id}-${item.color}`;
      initialQuantities[key] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const updateQuantity = (key, value) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(1, prev[key] + value),
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const key = `${item.id}-${item.color}`;
      const qty = quantities[key] || 1;
      return acc + qty * parseFloat(item.price_discount);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Carrito de compras
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => {
            const key = `${item.id}-${item.color}`;
            const qty = quantities[key] || 1;
            return (
              <div key={key}>
                <Link
                  href={`/${formatSlug(item.nameLink)}`}
                  className="flex gap-4 items-start border p-4 rounded-xl shadow-sm"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h2>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="text-sm text-gray-500">
                      Color:{" "}
                      <span className="font-medium text-gray-700">
                        {item.color}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Precio:{" "}
                      <span className="text-green-600 font-bold text-md">
                        ${item.price_discount}
                      </span>{" "}
                      <span className="line-through text-gray-400 ml-2">
                        ${item.price}
                      </span>
                    </div>
                    <Counter
                      count={qty}
                      setCount={(val) => updateQuantity(key, val)}
                      quantity={10}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="border p-6 rounded-xl shadow-md bg-gray-50 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Resumen</h2>
          <div className="border p-4 rounded-xl shadow-sm my-2 flex justify-between items-center">
            <label className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked
                readOnly
                className="accent-black"
              />
              Envío gratis
            </label>
            <span className="font-semibold text-green-600">Gratis</span>
          </div>
          <div className="border p-4 rounded-xl shadow-sm mb-6 my-2 flex justify-between items-center">
            <label className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked
                readOnly
                className="accent-black"
              />
              Pago Contra Entrega
            </label>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-4">
            <span>Total</span>
            <span>${calculateTotal().toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            className="flex w-full mt-6 justify-center bg-black text-white py-2 rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            <label>Finalizar compra</label>
          </Link>
        </div>
      </div>
      <Checkout />
    </div>
  );
}
