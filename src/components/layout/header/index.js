"use client";

import HeaderNav from "./components/headerNav";
import HeaderTop from "./components/headerTop";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[var(--border-soft)] overflow-visible">
      <HeaderTop />
      <HeaderNav />
    </header>
  );
}
