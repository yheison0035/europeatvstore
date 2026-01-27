import { notFound } from "next/navigation";
import { legalDocuments } from "@/lib/legal/legalDocuments";
import Container from "@/components/layout/container";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default async function LegalPage({ params }) {
  const { slug } = await params;

  const doc = legalDocuments.find((d) => d.slug === slug);

  if (!doc) return notFound();

  return (
    <>
      <Header />
      <Container>
        <main className="px-4 py-10 md:pt-49 pt-70">
          <h1 className="text-3xl font-bold text-(--text-primary) mb-10">
            {doc.title}
          </h1>

          <div className="space-y-10 text-(--text-secondary) leading-relaxed">
            {doc.sections.map((section, index) => (
              <section key={index} className="space-y-4">
                {section.heading && (
                  <h2 className="text-xl font-semibold text-(--text-primary)">
                    {section.heading}
                  </h2>
                )}

                <div className="space-y-3 text-base">
                  {section.content.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </Container>
      <Footer />
    </>
  );
}
