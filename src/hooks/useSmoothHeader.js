"use client";
import { useEffect, useRef } from "react";

export function useSmoothHeader(ref, hideHeight) {
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const offset = Math.min(y, hideHeight);

        if (ref.current) {
          ref.current.style.transform = `translateY(-${offset}px)`;
        }

        ticking.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideHeight, ref]);
}
