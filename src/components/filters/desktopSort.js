"use client";

import { useFilters } from "@/hooks/useFilters";
import { filtersConfig } from "@/utils/filters.config";

export function DesktopSort() {
  const { set } = useFilters();

  return (
    <select
      onChange={(e) => set("sort", e.target.value)}
      className="
        border border-(--border-soft)
        rounded-lg px-3 py-2
        bg-(--bg-page)
        text-sm cursor-pointer
        min-w-55
      "
    >
      <option value="">Ordenar por</option>
      {filtersConfig.sort.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
