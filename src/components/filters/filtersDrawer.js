"use client";

import Drawer from "./drawer";
import { filtersConfig } from "@/utils/filters.config";
import { useFilters } from "@/hooks/useFilters";

export default function FiltersDrawer({ open, onClose }) {
  const { toggle, set, clearAll, has, count } = useFilters();

  return (
    <Drawer open={open} onClose={onClose} title="Filtrar productos">
      <div className="flex justify-between mb-4">
        <span className="text-sm">{count} filtros activos</span>
        {count > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-(--danger) hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <Section title="Marca">
        {filtersConfig.brands.map((b) => (
          <Check
            key={b.value}
            label={b.label}
            checked={has("brands", b.value)}
            onChange={() => toggle("brands", b.value)}
          />
        ))}
      </Section>

      <Section title="Color">
        {filtersConfig.colors.map((c) => (
          <Check
            key={c.value}
            label={c.label}
            checked={has("colors", c.value)}
            onChange={() => toggle("colors", c.value)}
          />
        ))}
      </Section>

      <Section title="Precio">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Desde"
            onBlur={(e) => set("minPrice", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Hasta"
            onBlur={(e) => set("maxPrice", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </Section>
    </Drawer>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold mb-2 text-(--text-primary)">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, checked = false, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={onChange}
        className="accent-(--brand-primary)"
      />
      {label}
    </label>
  );
}
