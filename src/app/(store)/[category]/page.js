export default async function CategoryPage({ params }) {
  const { category } = await params;

  return <p>Categoria: {category}</p>;
}
