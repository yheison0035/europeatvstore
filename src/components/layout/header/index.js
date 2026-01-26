"use client";

import HeaderNav from "./components/headerNav";
import HeaderTop from "./components/headerTop";

export default function Header() {
  return (
    <header
      role="banner"
      className="
        fixed top-0 left-0 w-full
        bg-(--bg-page)
        border-b border-(--border-soft)
        z-50
      "
    >
      <HeaderTop />
      <HeaderNav />
    </header>
  );
}
