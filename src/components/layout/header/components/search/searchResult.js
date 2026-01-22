"use client";

import { mapSearchProduct } from "@/utils/mapSearchProduct";
import SearchItem from "./searchItem";

export default function SearchResults({ results }) {
  return (
    <div
      className="
        absolute top-full mt-2 w-full
        bg-[var(--bg-page)]
        rounded-2xl
        shadow-[var(--shadow-lg)]
        max-h-[75vh]
        overflow-y-auto
        z-[999]
      "
    >
      {results.map((product) => (
        <SearchItem key={product.id} product={mapSearchProduct(product)} />
      ))}
    </div>
  );
}
