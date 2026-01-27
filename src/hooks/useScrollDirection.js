"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState("up");
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastY) < threshold) return;

      setDirection(currentY > lastY ? "down" : "up");
      setLastY(currentY);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, threshold]);

  return direction;
}
