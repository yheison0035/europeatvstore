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

  function get(key) {
    return searchParams.get(key) || "";
  }

  function set(key, value) {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`);
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams);
    params.forEach((_, key) => params.delete(key));
    router.push(`?${params.toString()}`);
  }

  function has(key, value) {
    return (searchParams.get(key) || "").split(",").includes(value);
  }

  const count = [...searchParams.entries()].reduce((acc, [_, value]) => {
    if (!value) return acc;
    return acc + value.split(",").filter(Boolean).length;
  }, 0);

  return { toggle, set, get, has, clearAll, count };
}
