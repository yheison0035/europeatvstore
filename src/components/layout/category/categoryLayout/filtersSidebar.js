"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function FiltersSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function toggleParam(key, value) {
    const params = new URLSearchParams(searchParams);
    const values = params.get(key)?.split(",") || [];

    if (values.includes(value)) {
      const updated = values.filter((v) => v !== value);
      updated.length ? params.set(key, updated.join(",")) : params.delete(key);
    } else {
      params.set(key, [...values, value].join(","));
    }

    router.push(`?${params.toString()}`);
  }

  function setPrice(key, value) {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`);
  }

  return (
    <aside className="bg-(--bg-page) p-5 rounded-xl border border-(--border-soft)">
      <h3 className="font-semibold mb-4 text-(--text-primary)">Filtrar por</h3>

      <FilterGroup title="Color">
        {["Blanco", "Negro"].map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={searchParams.get("colors")?.includes(c.toLowerCase())}
            onChange={() => toggleParam("colors", c.toLowerCase())}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Marca">
        {["Lemman", "EUROPEATVSTORE"].map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={searchParams.get("brands")?.includes(b.toLowerCase())}
            onChange={() => toggleParam("brands", b.toLowerCase())}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Precio">
        <div className="flex gap-2">
          <input
            placeholder="Desde"
            type="number"
            onBlur={(e) => setPrice("minPrice", e.target.value)}
            className="w-full border border-(--border-soft) rounded px-2 py-1 text-sm"
          />
          <input
            placeholder="Hasta"
            type="number"
            onBlur={(e) => setPrice("maxPrice", e.target.value)}
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
    <label className="flex items-center gap-2 text-sm text-(--text-secondary)">
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
