"use client";

import { useState } from "react";
import { useLayout } from "@/context/layoutContext";
import { useFilters } from "@/hooks/useFilters";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import SortDrawer from "./sortDrawer";
import FiltersDrawer from "./filtersDrawer";

export default function MobileFiltersBar({ total }) {
  const { headerHeight, headerOffset } = useLayout();
  const { count } = useFilters();

  const [openSort, setOpenSort] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      <nav
        style={{
          transform: `translateY(${headerHeight - headerOffset}px)`,
        }}
        className="
          md:hidden
          fixed
          left-0 right-0
          top-0
          z-40
          bg-(--bg-page)
          border-b border-(--border-soft)
          will-change-transform
        "
      >
        <div className="grid grid-cols-3 divide-x divide-(--border-soft)">
          <div className="py-3 text-center text-sm">
            <span className="font-semibold">{total}</span> productos
          </div>

          <button
            onClick={() => setOpenSort(true)}
            className="py-3 flex items-center justify-center gap-1 text-sm"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            Ordenar
          </button>

          <button
            onClick={() => setOpenFilters(true)}
            className="py-3 flex items-center justify-center gap-1 text-sm relative"
          >
            <FunnelIcon className="w-4 h-4" />
            Filtrar
            {count > 0 && (
              <span className="absolute top-1 right-2 w-5 h-5 rounded-full bg-(--brand-primary) text-white text-xs flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <SortDrawer open={openSort} onClose={() => setOpenSort(false)} />
      <FiltersDrawer open={openFilters} onClose={() => setOpenFilters(false)} />
    </>
  );
}
