import { notFound } from "next/navigation";
import { legalDocuments } from "@/lib/legal/legalDocuments";

export default async function LegalPage({ params }) {
  const { slug } = await params;

  const doc = legalDocuments.find((d) => d.slug === slug);

  if (!doc) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-(--text-primary) mb-8">
        {doc.title}
      </h1>

      <div className="space-y-4 text-(--text-secondary) leading-relaxed">
        {doc.content.map((block, i) => (
          <p key={i}>{block.text}</p>
        ))}
      </div>
    </main>
  );
}
