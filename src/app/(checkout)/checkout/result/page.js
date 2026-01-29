import { Suspense } from "react";
import CheckoutResultClient from "./checkoutResultClient";

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutResultClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Validando transacción…</p>
    </div>
  );
}
