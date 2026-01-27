"use client";

import Header from "@/components/layout/header";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { useHeaderOffset } from "@/hooks/useHeaderOffset";
import { LayoutContext } from "@/context/layoutContext";

export default function CategoryLayout({ children }) {
  const { ref, height } = useHeaderHeight();
  const offset = useHeaderOffset(height);

  return (
    <LayoutContext.Provider
      value={{
        headerHeight: height,
        headerOffset: offset,
      }}
    >
      <Header ref={ref} offset={offset} />

      <main style={{ paddingTop: height }} className="bg-(--bg-soft)">
        {children}
      </main>
    </LayoutContext.Provider>
  );
}
