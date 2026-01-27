"use client";

import { useEffect, useState } from "react";

export function useHeaderOffset(maxHeight) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      setOffset(Math.min(window.scrollY, maxHeight));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxHeight]);

  return offset;
}
