"use client";

import CatalogLayout from "@/components/layout/catalog/catalogLayout";
import Container from "@/components/layout/container";

export default function CatalogClient({ category }) {
  return (
    <main className="bg-(--bg-soft)">
      <Container>
        <CatalogLayout category={category} />
      </Container>
    </main>
  );
}
