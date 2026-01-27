"use client";
import { useLayoutEffect, useRef, useState } from "react";

export function useHeaderHeight() {
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const [heights, setHeights] = useState({
    header: 0,
    nav: 0,
  });

  useLayoutEffect(() => {
    function update() {
      if (!headerRef.current || !navRef.current) return;

      const headerH = headerRef.current.offsetHeight;
      const navH = navRef.current.offsetHeight;

      setHeights({ header: headerH, nav: navH });

      document.documentElement.style.setProperty(
        "--header-height",
        `${headerH}px`,
      );

      document.documentElement.style.setProperty(
        "--header-nav-height",
        `${navH}px`,
      );
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    headerRef,
    navRef,
    heights,
  };
}
