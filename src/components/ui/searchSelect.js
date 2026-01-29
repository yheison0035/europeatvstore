"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SearchSelect({
  label,
  name,
  value,
  options = [],
  placeholder = "Buscar...",
  onChange,
  disabled = false,
  error,
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectOption(option) {
    onChange({
      target: {
        name,
        value: option.value,
      },
    });

    setSearch("");
    setOpen(false);
  }

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  return (
    <div ref={containerRef} className="relative flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`
            w-full flex items-center justify-between cursor-pointer
            border rounded-xl px-4 py-2 text-sm
            bg-white transition
            ${
              error
                ? "border-(--danger)"
                : "border-(--border-soft) hover:border-(--brand-accent)"
            }
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
        `}
      >
        <span className={selectedLabel ? "" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      {error && (
        <p className="text-xs text-(--danger) mt-1">
          Este campo es obligatorio
        </p>
      )}
      {open && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <input
            type="text"
            autoFocus
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm border-b border-(--border-soft) outline-none"
          />

          <ul className="max-h-52 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400">
                Sin resultados
              </li>
            )}

            {filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => selectOption(opt)}
                className="
                  px-4 py-2 text-sm cursor-pointer
                  hover:bg-(--bg-soft)
                "
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
