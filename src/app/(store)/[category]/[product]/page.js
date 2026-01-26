"use cliente";

import Container from "@/components/layout/container";

export default async function ProductPage({ params }) {
  const { category, product } = await params;

  return (
    <main className="bg-(--bg-soft) py-10">
      <Container>
        <p>Categoria: {category}</p>
        <p>Producto: {product}</p>
      </Container>
    </main>
  );
}
