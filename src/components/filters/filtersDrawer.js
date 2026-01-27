"use client";

import Drawer from "./drawer";
import Portal from "../ui/portal";
import { filtersConfig } from "@/utils/filters.config";
import { useFilters } from "@/hooks/useFilters";

export default function FiltersDrawer({ open, onClose }) {
  const { toggle, has, set, clearAll, count } = useFilters();

  return (
    <Portal>
      <Drawer open={open} onClose={onClose} title="Filtrar productos">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-(--text-muted)">
            {count} filtro{count !== 1 && "s"} activo{count !== 1 && "s"}
          </span>

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
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Desde"
              value={has("minPrice") ? undefined : undefined}
              onChange={(e) => set("minPrice", e.target.value)}
              className="w-full border border-(--border-soft) rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Hasta"
              onChange={(e) => set("maxPrice", e.target.value)}
              className="w-full border border-(--border-soft) rounded px-3 py-2"
            />
          </div>
        </Section>
      </Drawer>
    </Portal>
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
