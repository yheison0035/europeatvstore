"use client";

import { Suspense } from "react";
import { CheckoutProvider } from "./checkoutContext";

export default function CheckoutProviderWrapper({ children }) {
  return (
    <Suspense fallback={null}>
      <CheckoutProvider>{children}</CheckoutProvider>
    </Suspense>
  );
}
