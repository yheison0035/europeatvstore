"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  ScissorsIcon,
  FaceSmileIcon,
  FireIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
  CloudIcon,
  PuzzlePieceIcon,
  VideoCameraIcon,
  HeartIcon,
  TvIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import { useRouter } from "next/navigation";
import { slugifyCategory } from "@/utils/slugify";
import { useNav } from "@/context/navigationContext";
import SkeletonGrid from "../ui/skeletons/skeletonGrid";

const CATEGORY_ICON_MAP = {
  ASEO: SparklesIcon,
  BARBERIA: ScissorsIcon,
  "BELLEZA MUJER": FaceSmileIcon,
  COCINA: FireIcon,
  DEPORTES: TrophyIcon,
  HERRAMIENTAS: WrenchScrewdriverIcon,
  HUMIFICADORES: CloudIcon,
  JUGUETERIA: PuzzlePieceIcon,
  "PROYECTORES Y VIDEO": VideoCameraIcon,
  "SALUD Y BIENESTAR": HeartIcon,
  STREAMING: TvIcon,
  "UTENSILIOS DE COCINA": FireIcon,
};

function getCategoryIcon(name) {
  return CATEGORY_ICON_MAP[name] || Squares2X2Icon;
}

export default function CategoriesSection() {
  const { getCategories } = useCategories();
  const router = useRouter();
  const { setActiveCategory } = useNav();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const res = await getCategories();
      if (mounted && res?.success) {
        setCategories(res.data || []);
      }
      if (mounted) setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [getCategories]);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? 4 : 6;
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const visibleCategories = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return categories.slice(start, start + ITEMS_PER_PAGE);
  }, [categories, page, ITEMS_PER_PAGE]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <section className="relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">
          Categorías
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          Encuentra fácilmente lo que estás buscando
        </p>
      </div>

      <div className="relative">
        <Arrow
          direction="left"
          disabled={!canPrev}
          onClick={() => canPrev && setPage((p) => p - 1)}
          position="left"
          desktop
        />
        <Arrow
          direction="right"
          disabled={!canNext}
          onClick={() => canNext && setPage((p) => p + 1)}
          position="right"
          desktop
        />

        {loading ? (
          <SkeletonGrid
            count={ITEMS_PER_PAGE}
            compact
            cols="grid-cols-2 sm:grid-cols-3"
          />
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {visibleCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.name);

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    const slug = slugifyCategory(cat.name);
                    setActiveCategory(slug);
                    router.push(`/${slug}`);
                  }}
                  className="
                    group relative
                    rounded-xl
                    p-4 sm:p-6
                    bg-[var(--category-bg)]
                    border border-[var(--border-soft)]
                    shadow-[var(--shadow-sm)]
                    hover:shadow-[var(--shadow-md)]
                    hover:bg-[var(--category-bg-hover)]
                    transition-all duration-300
                    hover:-translate-y-1
                    cursor-pointer
                  "
                >
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    <div
                      className="
                        w-12 h-12 sm:w-14 sm:h-14
                        rounded-xl
                        flex items-center justify-center
                        bg-[var(--category-icon-bg)]
                        group-hover:bg-[var(--category-icon-bg-hover)]
                        transition
                      "
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--category-icon-color)] group-hover:text-[var(--category-icon-color-hover)]" />
                    </div>

                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                      {cat.name}
                    </span>

                    <span className="text-[11px] sm:text-xs font-medium text-[var(--brand-accent)]">
                      Explorar →
                    </span>
                  </div>
                </button>
              );
            })}

            {visibleCategories.length < ITEMS_PER_PAGE &&
              Array.from({
                length: ITEMS_PER_PAGE - visibleCategories.length,
              }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rounded-xl bg-[var(--bg-muted)] border border-dashed border-[var(--border-soft)]"
                />
              ))}
          </div>
        )}
      </div>

      <div className="flex sm:hidden justify-center gap-6 mt-6">
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
    </section>
  );
}

function Arrow({ direction, disabled, onClick, position, desktop, mobile }) {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

  const base =
    "rounded-full flex items-center justify-center transition cursor-pointer";

  const desktopClasses = `
    hidden sm:flex
    absolute ${position === "left" ? "-left-14" : "-right-14"}
    top-1/2 -translate-y-1/2
    w-12 h-12
    bg-[var(--bg-page)]
    border border-[var(--border-soft)]
    shadow-[var(--shadow-md)]
    ${disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
  `;

  const mobileClasses = `
    w-10 h-10
    bg-[var(--bg-page)]
    border border-[var(--border-soft)]
    shadow-[var(--shadow-sm)]
    ${disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-105"}
  `;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${desktop ? desktopClasses : ""} ${
        mobile ? mobileClasses : ""
      }`}
    >
      <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
    </button>
  );
}
