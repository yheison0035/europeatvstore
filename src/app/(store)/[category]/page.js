import Breadcrumbs from "@/components/layout/category/breadcrumbs";
import CategoryLayout from "@/components/layout/category/categoryLayout";
import Container from "@/components/layout/container";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  return (
    <main className="bg-(--bg-soft) py-10">
      <Container>
        <Breadcrumbs category={category} />

        <CategoryLayout category={category} />
      </Container>
    </main>
  );
}
