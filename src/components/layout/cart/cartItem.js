"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";

export default function CartItem({ item }) {
  const { addToCart, removeFromCart } = useCart();

  const isLowStock = item.stock <= 3;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-300">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-xs text-gray-400">IMG</span>
      </div>

      <div className="flex-1">
        <p className="font-medium text-sm">
          {item.name} <span className="text-gray-400">- {item.color}</span>
        </p>

        <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>

        <p
          className={`
            text-xs mt-1
            ${isLowStock ? "text-orange-600" : "text-gray-400"}
          `}
        >
          {isLowStock
            ? `¡Solo quedan ${item.stock} disponibles!`
            : `Stock disponible: ${item.stock}`}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => addToCart(item, -1)}
            className="border rounded p-1 cursor-pointer"
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="w-4 h-4" />
          </button>

          <span className="text-sm font-medium">{item.quantity}</span>

          <button
            onClick={() => addToCart(item, 1)}
            className="border rounded p-1 cursor-pointer"
            disabled={item.quantity >= item.stock}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-semibold">
          ${(item.price * item.quantity).toLocaleString()}
        </span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-500 cursor-pointer"
          title="Eliminar producto"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
