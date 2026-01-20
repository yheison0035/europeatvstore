export default async function ProductPage({ params }) {
  const { category, product } = await params;

  return (
    <div>
      <p>Categoria: {category}</p>
      <p>Producto: {product}</p>
    </div>
  );
}
