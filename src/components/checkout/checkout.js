"use client";

import { useState, useEffect } from "react";

export default function Checkout() {
  const [discountCode, setDiscountCode] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Finalizar Compra
      </h1>

      <div className="border p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked
            readOnly
            className="accent-black placeholder-gray-600"
          />
          Envío gratis
        </label>
        <span className="font-semibold text-green-600">Gratis</span>
      </div>
      <div className="border p-4 rounded-xl shadow-sm mb-6 my-2 flex justify-between items-center">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input type="checkbox" checked readOnly className="accent-black" />
          Pago Contra Entrega
        </label>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Código de descuento"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm placeholder-gray-600 text-gray-600"
        />
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:opacity-90">
          Aplicar
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Ingresa tus datos de envío
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "WhatsApp", placeholder: "ej: 3001234567" },
          { label: "Teléfono", placeholder: "ej: 601234567" },
          { label: "Nombre y apellidos", placeholder: "ej: Juan Pérez" },
          { label: "Dirección completa", placeholder: "ej: Calle 123 #45-67" },
          {
            label: "Complemento y barrio",
            placeholder: "ej: Apto 202, Barrio Centro",
          },
          {
            label: "Punto de referencia",
            placeholder: "ej: Frente al parque principal",
          },
          {
            label: "Correo electrónico",
            placeholder: "ej: correo@ejemplo.com",
          },
        ].map((field, idx) => (
          <div key={idx} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={field.placeholder}
              className="w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-600 text-gray-600"
            />
          </div>
        ))}

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departamento <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2 text-sm text-gray-600"
          >
            <option value="">Seleccione un departamento</option>
            <option value="cundinamarca">Cundinamarca</option>
            <option value="antioquia">Antioquia</option>
            <option value="valle">Valle del Cauca</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2 text-sm text-gray-600"
          >
            <option value="">Seleccione una ciudad</option>
            <option value="bogota">Bogotá</option>
            <option value="medellin">Medellín</option>
            <option value="cali">Cali</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex md:mb-1 mb-6 items-center gap-2">
          <input type="checkbox" required className="accent-black" />
          <span className="text-sm text-gray-600">
            Acepte nuestros términos y condiciones
            <span className="text-red-600">*</span>
          </span>
        </div>

        <div className="col-span-1 md:col-span-2 hidden md:block">
          <button
            type="submit"
            className={`w-full py-3 text-lg font-bold text-white rounded-xl transition cursor-pointer ${
              pulse ? "bg-red-600 scale-105" : "bg-red-600"
            }`}
          >
            Comprar ahora - Pago contra entrega
          </button>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden">
          <button
            type="submit"
            className={`w-full py-3 text-lg font-bold text-white rounded-xl transition cursor-pointer ${
              pulse ? "bg-red-600 scale-105" : "bg-red-600"
            }`}
          >
            Comprar ahora - Pago contra entrega
          </button>
        </div>
      </form>
    </div>
  );
}
