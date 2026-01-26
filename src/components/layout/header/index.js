"use client";

import HeaderNav from "./components/headerNav";
import HeaderTop from "./components/headerTop";

export default function Header() {
  return (
    <header
      className="
        w-full
        bg-(--bg-page)
        border-b border-(--border-soft)
        overflow-visible
      "
      role="banner"
    >
      <HeaderTop />
      <HeaderNav />
    </header>
  );
}
