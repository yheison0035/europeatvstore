"use client";

import { mapSearchProduct } from "@/utils/mapSearchProduct";
import SearchItem from "./searchItem";

export default function SearchResults({ results }) {
  return (
    <div
      className="
        absolute top-full mt-2
        w-full
        bg-white
        rounded-2xl
        shadow-2xl
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
