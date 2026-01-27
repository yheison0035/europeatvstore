"use client";

import { useState } from "react";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useFilters } from "@/hooks/useFilters";
import SortDrawer from "./sortDrawer";
import FiltersDrawer from "./filtersDrawer";

export default function MobileFiltersBar({ total }) {
  const { count } = useFilters();
  const [openSort, setOpenSort] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      <nav className="md:hidden sticky top-(--header-height) z-40 bg-(--bg-page) border-b border-(--border-soft)">
        <div className="grid grid-cols-3 divide-x divide-zinc-300">
          <div className="py-3 text-center text-sm">
            <strong>{total}</strong> productos
          </div>

          <button onClick={() => setOpenSort(true)} className="py-3 text-sm">
            <AdjustmentsHorizontalIcon className="w-4 h-4 inline" /> Ordenar
          </button>

          <button
            onClick={() => setOpenFilters(true)}
            className="py-3 text-sm relative"
          >
            <FunnelIcon className="w-4 h-4 inline" /> Filtrar
            {count > 0 && (
              <span className="absolute top-1 right-2 w-5 h-5 bg-(--brand-primary) text-white text-xs rounded-full flex items-center justify-center">
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
