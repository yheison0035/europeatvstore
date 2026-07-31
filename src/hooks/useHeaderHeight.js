"use client";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * Mide el header fijo y publica su altura en variables CSS.
 *
 * Se observa el tamaño con ResizeObserver: si el header crece o encoge (al
 * cargar el logo, al girar el móvil, al aparecer una fila del menú), el
 * contenido de abajo se reajusta. Antes se medía una sola vez y, si el header
 * cambiaba después, el catálogo quedaba tapado por el menú.
 */
export function useHeaderHeight() {
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const [heights, setHeights] = useState({
    header: 0,
    nav: 0,
  });

  useLayoutEffect(() => {
    const header = headerRef.current;
    const nav = navRef.current;

    if (!header || !nav) return;

    function update() {
      const headerH = header.offsetHeight;
      const navH = nav.offsetHeight;

      setHeights((prev) =>
        prev.header === headerH && prev.nav === navH
          ? prev
          : { header: headerH, nav: navH },
      );

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

    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(nav);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return {
    headerRef,
    navRef,
    heights,
  };
}
