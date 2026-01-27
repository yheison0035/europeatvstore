"use client";

import HeaderTop from "./components/headerTop";
import HeaderNav from "./components/headerNav";
import { forwardRef } from "react";

const Header = forwardRef(function Header({ offset }, ref) {
  return (
    <header
      ref={ref}
      style={{
        transform: `translateY(-${offset}px)`,
      }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-(--bg-page)
        border-b border-(--border-soft)
        will-change-transform
      "
    >
      <HeaderTop />
      <HeaderNav />
    </header>
  );
});

export default Header;
