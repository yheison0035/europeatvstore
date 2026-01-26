"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { slugifyCategory } from "@/utils/slugify";
import { formatText } from "@/utils/textFormat";

export default function DesktopHeaderNav({
  categories,
  activeSlug,
  onNavigate,
  closeTimer,
  setHoveredCat,
  isHoveringMega,
}) {
  const scrollRef = useRef(null);
  const itemRefs = useRef({});

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  useEffect(() => {
    requestAnimationFrame(() => {
      updateArrows();
    });
  }, [categories, updateArrows]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (activeSlug === "home" || activeSlug === "novedades") {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const item = itemRefs.current[activeSlug];
    if (!item) return;

    const target = item.offsetLeft - el.clientWidth / 2 + item.clientWidth / 2;

    el.scrollTo({
      left: Math.max(0, Math.min(target, el.scrollWidth)),
      behavior: "smooth",
    });
  }, [activeSlug, categories]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:flex items-center gap-4 w-full">
      <div className="flex gap-6 shrink-0 py-3">
        {["home", "novedades"].map((key) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`pb-1 cursor-pointer ${
              activeSlug === key
                ? "border-b-2 border-white font-semibold"
                : "hover:text-(--brand-accent)"
            }`}
          >
            {key === "home" ? "Inicio" : "Novedades"}
          </button>
        ))}
      </div>

      {canLeft && (
        <button className="cursor-pointer" onClick={() => scroll("left")}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}

      <div ref={scrollRef} className="overflow-x-hidden">
        <div className="flex gap-6 py-3 whitespace-nowrap">
          {categories.map((cat) => {
            const slug = slugifyCategory(cat.name);

            return (
              <button
                key={cat.id}
                ref={(el) => (itemRefs.current[slug] = el)}
                onClick={() => onNavigate(slug)}
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
                className={`pb-1 whitespace-nowrap cursor-pointer ${
                  activeSlug === slug
                    ? "border-b-2 border-white font-semibold"
                    : "hover:text-(--brand-accent)"
                }`}
              >
                {formatText(cat.name, "capitalize")}
              </button>
            );
          })}
        </div>
      </div>

      {canRight && (
        <button className="cursor-pointer" onClick={() => scroll("right")}>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
