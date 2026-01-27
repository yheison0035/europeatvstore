"use client";

import { filtersConfig } from "@/utils/filters.config";
import { useFilters } from "@/hooks/useFilters";

export default function FiltersSidebar() {
  const { toggle, set } = useFilters();

  return (
    <aside className="bg-(--bg-page) p-5 rounded-xl border border-(--border-soft)">
      <h3 className="font-semibold mb-4 text-(--text-primary)">Filtrar por</h3>

      <FilterGroup title="Color">
        {filtersConfig.colors.map((c) => (
          <Checkbox
            key={c.value}
            label={c.label}
            onChange={() => toggle("colors", c.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Marca">
        {filtersConfig.brands.map((b) => (
          <Checkbox
            key={b.value}
            label={b.label}
            onChange={() => toggle("brands", b.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Precio">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Desde"
            onBlur={(e) => set("minPrice", e.target.value)}
            className="w-full border border-(--border-soft) rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="Hasta"
            onBlur={(e) => set("maxPrice", e.target.value)}
            className="w-full border border-(--border-soft) rounded px-2 py-1 text-sm"
          />
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-(--text-primary) mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-(--text-secondary) cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-(--brand-primary)"
      />
      {label}
    </label>
  );
}
