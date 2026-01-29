"use client";

import { useEffect, useRef } from "react";
import { slugifyCategory } from "@/utils/slugify";
import { formatText } from "@/utils/textFormat";

export default function MobileHeaderNav({
  categories,
  activeSlug,
  onNavigate,
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  const items = [
    { label: "Inicio", slug: "home" },
    { label: "Novedades", slug: "novedades" },
    { label: "Ofertas", slug: "ofertas" },
    ...categories.map((c) => ({
      label: c.name,
      slug: slugifyCategory(c.name),
    })),
  ];

  useEffect(() => {
    const el = itemRefs.current[activeSlug];
    const container = containerRef.current;
    if (!el || !container) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }, [activeSlug, categories]);

  return (
    <div
      ref={containerRef}
      className="md:hidden overflow-x-auto scrollbar-hide"
    >
      <div className="flex gap-6 py-3 px-4 whitespace-nowrap">
        {items.map((item) => (
          <button
            key={item.slug}
            ref={(el) => (itemRefs.current[item.slug] = el)}
            onClick={() => onNavigate(item.slug)}
            className={`shrink-0 pb-1 ${
              activeSlug === item.slug
                ? "border-b-2 border-white font-semibold"
                : "opacity-80 hover:text-(--brand-accent)"
            }`}
          >
            {formatText(item.label, "capitalize")}
          </button>
        ))}
      </div>
    </div>
  );
}
