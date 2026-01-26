"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import useProducts from "@/lib/utils/api/hooks/useProducts";
import SearchResults from "./searchResult";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const { searchProducts, loading } = useProducts();
  const containerRef = useRef(null);

  useEffect(() => {
    async function run() {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      const res = await searchProducts(query);
      if (res?.success && Array.isArray(res.data)) {
        setResults(res.data);
      } else if (Array.isArray(res)) {
        setResults(res);
      } else {
        setResults([]);
      }
    }
    run();
  }, [query, searchProducts]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (results.length > 0) setOpen(true);
  }, [results]);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl">
      <div className="relative">
        <MagnifyingGlassIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6
          text-(--text-muted)"
        />

        <input
          type="search"
          aria-label="Buscar productos"
          placeholder="Buscar productos: hidrolavadoras, masajeadores, cocina, streaming…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className="
            w-full
            pl-14 pr-4 py-2
            rounded-xl
            border border-(--border-soft)
            bg-(--bg-page)
            text-(--text-primary)
            placeholder:text-(--text-muted)
            focus:ring-2 focus:ring-(--brand-primary)
            outline-none
            shadow-(--shadow-sm)
            cursor-pointer
          "
        />
      </div>

      {open && results.length > 0 && (
        <SearchResults results={results} loading={loading} />
      )}
    </div>
  );
}
