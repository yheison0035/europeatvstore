"use client";

import { useRouter } from "next/navigation";
import { slugifyCategory } from "@/utils/slugify";
import { useNav } from "@/context/navigationContext";
import {
  Squares2X2Icon,
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
} from "@heroicons/react/24/outline";

/**
 * Mapa de iconos por nombre de categoría
 * (usa exactamente los mismos nombres que vienen del backend)
 */
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
};

export default function CategoryCard({ category }) {
  // Los hooks van antes de cualquier return: si no, React se queja de que el
  // orden cambia entre renders.
  const router = useRouter();
  const { setActiveCategory } = useNav();

  if (!category || !category.name) return null;

  const Icon = CATEGORY_ICON_MAP[category.name] || Squares2X2Icon;

  const handleClick = () => {
    const slug = slugifyCategory(category.name);
    setActiveCategory(slug);
    router.push(`/${slug}`);
  };

  return (
    <button
      onClick={handleClick}
      className="
        group relative
        rounded-xl
        p-4 sm:p-6
        bg-(--category-bg)
        border border-(--border-soft)
        shadow-(--shadow-sm)
        hover:shadow-(--shadow-md)
        hover:bg-(--category-bg-hover)
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
            bg-(--category-icon-bg)
            group-hover:bg-(--category-icon-bg-hover)
            transition
          "
        >
          <Icon
            className="
              w-6 h-6 sm:w-7 sm:h-7
              text-(--category-icon-color)
              group-hover:text-(--category-icon-color-hover)
            "
          />
        </div>

        <span className="text-xs sm:text-sm font-semibold text-(--text-primary)">
          {category.name}
        </span>

        <span className="text-[11px] sm:text-xs font-medium text-(--brand-accent)">
          Explorar →
        </span>
      </div>
    </button>
  );
}
