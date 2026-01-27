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

      <main style={{ paddingTop: heights.header }} className="bg-(--bg-soft)">
        {children}
      </main>
    </>
  );
}
