import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BoxCart({ cartItems, toggleItem }) {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-md z-50 p-4">
      <h3 className="text-sm text-gray-400 font-bold mb-2">Carrito</h3>
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
                  {item.name} - {item.color}
                </p>
                <p className="text-red-600 font-semibold">
                  ${parseInt(item.price_discount).toLocaleString("es-CO")}
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
        href="/cart"
        className="block mt-4 w-full text-center bg-red-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <ShoppingCartIcon className="h-5 w-5" />
        Ver carrito
      </Link>
    </div>
  );
}
