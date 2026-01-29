"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutResultClient() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Procesando pago</h1>
        <p className="text-sm text-gray-500">
          ID de transacción: {transactionId}
        </p>
      </div>
    </div>
  );
}
