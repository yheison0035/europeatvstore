import CategoryLayout from "@/components/layout/category/categoryLayout";
import Container from "@/components/layout/container";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  return (
    <main className="bg-(--bg-soft) py-4 md:py-12">
      <Container>
        <CategoryLayout category={category} />
      </Container>
    </main>
  );
}
