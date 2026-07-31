"use client";

import CatalogLayout from "@/components/layout/catalog/catalogLayout";
import CatalogContainer from "../catalogContainer";

export default function CatalogClient({ category, initialCatalog = null }) {
  return (
    <main className="bg-(--bg-soft)">
      <CatalogContainer>
        <CatalogLayout category={category} initialCatalog={initialCatalog} />
      </CatalogContainer>
    </main>
  );
}
