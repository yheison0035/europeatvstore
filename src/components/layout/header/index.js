"use client";

import HeaderNav from "./components/headerNav";
import HeaderTop from "./components/headerTop";

export default function Header() {
  return (
    <header
      className="
        w-full
        bg-[var(--bg-page)]
        border-b border-[var(--border-soft)]
        overflow-visible
      "
      role="banner"
    >
      <HeaderTop />
      <HeaderNav />
    </header>
  );
}
