"use client";

import { CartProvider } from "./cartContext";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
