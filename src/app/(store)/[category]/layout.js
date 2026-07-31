"use client";

import Header from "@/components/layout/header";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { useSmoothHeader } from "@/hooks/useSmoothHeader";

export default function CategoryLayout({ children }) {
  const { headerRef, navRef, heights } = useHeaderHeight();

  const hideHeight = heights.header - heights.nav;

  useSmoothHeader(headerRef, hideHeight);

  return (
    <>
      <Header ref={headerRef} navRef={navRef} />

      {/*
        El espacio bajo el header fijo sale de la variable CSS, no del estado:
        así ya es correcto en el primer pintado. Con `heights.header` valía 0
        hasta hidratar y al recargar el menú tapaba el catálogo y los filtros.
        useHeaderHeight actualiza la variable con la medida real.
      */}
      <main className="bg-(--bg-soft) pt-(--header-height)">{children}</main>
    </>
  );
}
