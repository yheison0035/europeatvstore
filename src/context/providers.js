"use client";

import { CartProvider } from "./cartContext";
import { WebsiteProvider } from "./websiteContext";

export default function Providers({ children, initialWebsite = null }) {
  return (
    <WebsiteProvider initialWebsite={initialWebsite}>
      <CartProvider>{children}</CartProvider>
    </WebsiteProvider>
  );
}
