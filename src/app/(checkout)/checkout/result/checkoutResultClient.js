"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutResultClient() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  // Pedido contra entrega: no pasa por Wompi, llega con su código.
  const orderCode = searchParams.get("order");

  const [status, setStatus] = useState(orderCode ? "order" : "loading");

  useEffect(() => {
    if (!transactionId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wompi/transaction/${transactionId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.status === "APPROVED") {
          setStatus("approved");
        } else if (data?.data?.status === "DECLINED") {
          setStatus("declined");
        } else {
          setStatus("loading");
        }
      })
      .catch(() => setStatus("declined"));
  }, [transactionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        {status === "order" && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-green-600">
              ¡Pedido confirmado!
            </h1>
            <p className="text-sm text-gray-500">
              Te contactaremos para coordinar la entrega. Pagas al recibir.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-700">
              Pedido {orderCode}
            </p>
          </>
        )}

        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Procesando pago</h1>
            <p className="text-sm text-gray-500">
              Validando transacción con Wompi…
            </p>
          </>
        )}

        {status === "approved" && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-green-600">
              Pago aprobado
            </h1>
            <p className="text-sm text-gray-500">
              Tu pago fue procesado correctamente.
            </p>
          </>
        )}

        {status === "declined" && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-red-600">
              Pago rechazado
            </h1>
            <p className="text-sm text-gray-500">
              El pago no pudo completarse.
            </p>
          </>
        )}

        {transactionId && (
          <p className="text-xs text-gray-400 mt-4">
            ID de transacción: {transactionId}
          </p>
        )}
      </div>
    </div>
  );
}
