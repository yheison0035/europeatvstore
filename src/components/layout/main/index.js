import Container from "@/components/layout/container";
import CategoriesSection from "@/components/sections/categoriesSection";

export default function Main() {
  return (
    <main className="bg-[var(--bg-soft)] py-10">
      <Container>
        <CategoriesSection />
      </Container>
    </main>
  );
}
