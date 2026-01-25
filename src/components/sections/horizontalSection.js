"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SkeletonGrid from "../ui/skeletons/skeletonGrid";
import ProductCardMini from "./productCardMini";
import CategoryCard from "./categoryCard";

export default function HorizontalSection({
  title,
  subtitle,
  items = [],
  loading = false,

  type = "category",
  layout = "grid",

  itemsPerPageDesktop = 6,
  itemsPerPageMobile = 4,
}) {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? itemsPerPageMobile : itemsPerPageDesktop;

  const totalPages =
    layout === "grid" ? Math.ceil(items.length / ITEMS_PER_PAGE) : 1;

  const visibleItems = useMemo(() => {
    if (layout !== "grid") return items;
    const start = page * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page, ITEMS_PER_PAGE, layout]);

  const canPrev = layout === "grid" ? page > 0 : true;
  const canNext = layout === "grid" ? page < totalPages - 1 : true;

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const amount = 260; // ancho card + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[var(--text-muted)] mt-2">{subtitle}</p>
        )}
      </div>

      <Arrow
        direction="left"
        disabled={!canPrev}
        onClick={() =>
          layout === "grid" ? canPrev && setPage((p) => p - 1) : scroll("left")
        }
        position="left"
      />
      <Arrow
        direction="right"
        disabled={!canNext}
        onClick={() =>
          layout === "grid" ? canNext && setPage((p) => p + 1) : scroll("right")
        }
        position="right"
      />

      {loading ? (
        <SkeletonGrid
          count={ITEMS_PER_PAGE}
          compact
          cols={
            layout === "grid"
              ? "grid-cols-2 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
          }
        />
      ) : layout === "grid" ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {visibleItems.map((item) =>
            type === "category" ? (
              <CategoryCard key={item.id} category={item} />
            ) : null,
          )}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto pb-2
            scroll-smooth scrollbar-hide
          "
        >
          {items.map((item) => (
            <div key={item.id} className="min-w-[240px]">
              <ProductCardMini product={item} />
            </div>
          ))}
        </div>
      )}

      {layout === "grid" && (
        <div className="flex sm:hidden justify-center gap-6 mt-9">
          <Arrow
            direction="left"
            disabled={!canPrev}
            onClick={() => canPrev && setPage((p) => p - 1)}
            mobile
          />
          <Arrow
            direction="right"
            disabled={!canNext}
            onClick={() => canNext && setPage((p) => p + 1)}
            mobile
          />
        </div>
      )}
    </section>
  );
}

function Arrow({ direction, disabled, onClick, position, mobile }) {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${mobile ? "" : "hidden sm:flex absolute"}
        ${position === "left" ? "-left-14" : "-right-14"}
        top-[60%] -translate-y-1/2
        w-12 h-12
        rounded-full
        bg-[var(--bg-page)]
        border border-[var(--border-soft)]
        shadow-[var(--shadow-md)]
        flex items-center justify-center
        transition
        z-10
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
      `}
    >
      <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
    </button>
  );
}
