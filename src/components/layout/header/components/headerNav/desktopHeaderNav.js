"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { slugifyCategory } from "@/utils/slugify";
import { formatText } from "@/utils/textFormat";

export default function DesktopHeaderNav({
  isActive,
  categories,
  itemRefs,
  desktopTrackRef,
  scroll,
  closeTimer,
  setHoveredCat,
  isHoveringMega,
}) {
  return (
    <div className="hidden md:flex items-center gap-4">
      <ul className="flex gap-6 py-3 whitespace-nowrap">
        <li>
          <Link
            href="/"
            className={
              isActive("/") ? "border-b-2 border-white font-semibold" : ""
            }
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="/novedades"
            className={
              isActive("/novedades")
                ? "border-b-2 border-white font-semibold"
                : ""
            }
          >
            Novedades
          </Link>
        </li>
      </ul>

      <button onClick={() => scroll("left")} className="p-1">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <div ref={desktopTrackRef} className="overflow-x-hidden flex-1">
        <ul className="flex gap-6 py-3 whitespace-nowrap">
          {categories.map((cat) => {
            const slug = `/${slugifyCategory(cat.name)}`;

            return (
              <li
                key={cat.id}
                ref={(el) => (itemRefs.current[slug.replace("/", "")] = el)}
                onMouseEnter={(e) => {
                  clearTimeout(closeTimer.current);
                  setHoveredCat({
                    cat,
                    rect: e.currentTarget.getBoundingClientRect(),
                  });
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => {
                    if (!isHoveringMega) setHoveredCat(null);
                  }, 120);
                }}
              >
                <Link
                  href={slug}
                  className={`flex items-center gap-1 ${
                    isActive(slug)
                      ? "border-b-2 border-white font-semibold"
                      : "hover:text-[var(--brand-accent)]"
                  }`}
                >
                  {formatText(cat.name, "capitalize")}
                  <ChevronDownIcon className="w-4 h-4" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={() => scroll("right")} className="p-1">
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
