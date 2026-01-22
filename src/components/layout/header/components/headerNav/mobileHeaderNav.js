import Link from "next/link";
import { slugifyCategory } from "@/utils/slugify";
import { formatText } from "@/utils/textFormat";

export default function MobileHeaderNav({
  isActive,
  categories,
  itemRefs,
  mobileTrackRef,
}) {
  return (
    <div className="md:hidden overflow-x-auto scrollbar-hide">
      <ul ref={mobileTrackRef} className="flex gap-6 py-3 whitespace-nowrap">
        {[
          { name: "Inicio", slug: "/" },
          { name: "Novedades", slug: "/novedades" },
          ...categories.map((c) => ({
            name: c.name,
            slug: `/${slugifyCategory(c.name)}`,
          })),
        ].map((item) => {
          const key = item.slug === "/" ? "home" : item.slug.replace("/", "");

          return (
            <li
              key={item.slug}
              ref={(el) => {
                if (el) itemRefs.current[key] = el;
              }}
            >
              <Link
                href={item.slug}
                className={`pb-1 transition ${
                  isActive(item.slug)
                    ? "border-b-2 border-white font-semibold"
                    : "hover:text-[var(--brand-accent)]"
                }`}
              >
                {formatText(item.name, "capitalize")}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
