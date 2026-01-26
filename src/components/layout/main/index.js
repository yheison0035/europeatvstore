import Container from "@/components/layout/container";
import OffersSection from "@/components/sections/offersSection";
import SectionWrapper from "../sectionWrapper";
import CategoriesSection from "@/components/sections/categoriesSection";
import NewsSection from "@/components/sections/newsSection";

export default function Main() {
  return (
    <main className="bg-(--bg-soft) py-10">
      <Container>
        <SectionWrapper>
          <CategoriesSection />
        </SectionWrapper>

        <SectionWrapper>
          <NewsSection />
        </SectionWrapper>

        <SectionWrapper>
          <OffersSection />
        </SectionWrapper>
      </Container>
    </main>
  );
}
