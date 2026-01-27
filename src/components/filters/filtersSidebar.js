"use client";

import { filtersConfig } from "@/utils/filters.config";
import { useFilters } from "@/hooks/useFilters";

export default function FiltersSidebar() {
  const { toggle, has, get, set } = useFilters();

  return (
    <aside
      className="
        bg-(--bg-page)
        p-5
        rounded-xl
        border border-(--border-soft)
        shadow-sm
      "
    >
      <h3 className="font-semibold mb-4">Filtrar por</h3>

      <Group title="Color">
        {filtersConfig.colors.map((c) => (
          <Check
            key={c.value}
            label={c.label}
            checked={has("colors", c.value)}
            onChange={() => toggle("colors", c.value)}
          />
        ))}
      </Group>

      <Group title="Marca">
        {filtersConfig.brands.map((b) => (
          <Check
            key={b.value}
            label={b.label}
            checked={has("brands", b.value)}
            onChange={() => toggle("brands", b.value)}
          />
        ))}
      </Group>

      <Group title="Precio">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Desde"
            value={get("minPrice")}
            onChange={(e) => set("minPrice", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Hasta"
            value={get("maxPrice")}
            onChange={(e) => set("maxPrice", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </Group>
    </aside>
  );
}

function Group({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
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
