"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function toggle(key, value) {
    const params = new URLSearchParams(searchParams);
    const values = (params.get(key) || "").split(",").filter(Boolean);

    if (values.includes(value)) {
      const updated = values.filter((v) => v !== value);
      updated.length ? params.set(key, updated.join(",")) : params.delete(key);
    } else {
      params.set(key, [...values, value].join(","));
    }

    router.push(`?${params.toString()}`);
  }

  function set(key, value) {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`);
  }

  function clearAll() {
    router.push(window.location.pathname);
  }

  function has(key, value) {
    return (searchParams.get(key) || "").split(",").includes(value);
  }

  const count = [...searchParams.entries()].filter(([_, v]) => v).length;

  return { toggle, set, has, clearAll, count };
}
