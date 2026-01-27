"use client";

import CatalogProductCard from "./catalogProductCard";
import { mapSearchProduct } from "@/utils/mapSearchProduct";

export default function ProductCard({ product, category }) {
  return (
    <CatalogProductCard
      product={mapSearchProduct(product)}
      category={category}
    />
  );
}
