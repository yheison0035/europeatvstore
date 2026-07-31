import Container from "@/components/layout/container";
import OffersSection from "@/components/sections/offersSection";
import SectionWrapper from "../sectionWrapper";
import CategoriesSection from "@/components/sections/categoriesSection";
import NewsSection from "@/components/sections/newsSection";
import HeroSection from "@/components/sections/heroSection";

export default function Main() {
  return (
    <main className="bg-(--bg-soft) py-10 md:pt-49 pt-70">
      <Container>
        <SectionWrapper>
          <HeroSection />
        </SectionWrapper>

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
