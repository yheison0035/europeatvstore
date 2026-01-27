"use client";

import HeaderNav from "./components/headerNav";
import HeaderTop from "./components/headerTop";

export default function Header({ hidden = false }) {
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        bg-(--bg-page)
        border-b border-(--border-soft)
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <HeaderTop />
      <HeaderNav />
    </header>
  );
}
