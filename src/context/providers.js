"use client";

import { CartProvider } from "./cartContext";
import { WebsiteProvider } from "./websiteContext";

export default function Providers({ children }) {
  return (
    <WebsiteProvider>
      <CartProvider>{children}</CartProvider>
    </WebsiteProvider>
  );
}
