"use client";

import { useEffect, useRef, useState } from "react";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import { usePathname } from "next/navigation";
import ListProductHeader from "./headerNav/listProducts";
import DesktopHeaderNav from "./headerNav/desktopHeaderNav";
import MobileHeaderNav from "./headerNav/mobileHeaderNav";

export default function HeaderNav() {
  const { getCategories } = useCategories();
  const [categories, setCategories] = useState([]);

  const [hoveredCat, setHoveredCat] = useState(null);
  const [isHoveringMega, setIsHoveringMega] = useState(false);

  const closeTimer = useRef(null);
  const mobileTrackRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const itemRefs = useRef({});
  const pathname = usePathname();

  useEffect(() => {
    async function load() {
      const res = await getCategories();
      if (res?.success) setCategories(res.data || []);
    }
    load();
  }, [getCategories]);

  useEffect(() => {
    if (!categories.length) return;

    const slug = pathname === "/" ? "home" : pathname.split("/")[1];
    const itemEl = itemRefs.current[slug];

    const container =
      window.innerWidth < 768
        ? mobileTrackRef.current
        : desktopTrackRef.current;

    if (!itemEl || !container) return;

    const attemptScroll = () => {
      if (container.scrollWidth <= container.clientWidth) {
        requestAnimationFrame(attemptScroll);
        return;
      }

      const target =
        itemEl.offsetLeft - container.clientWidth / 2 + itemEl.clientWidth / 2;

      container.scrollTo({
        left: Math.max(0, target),
        behavior: "smooth",
      });
    };

    requestAnimationFrame(attemptScroll);
  }, [pathname, categories]);

  const scroll = (dir) => {
    const el = desktopTrackRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav className="bg-[var(--brand-primary)] text-[var(--text-inverted)] relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <MobileHeaderNav
            mobileTrackRef={mobileTrackRef}
            isActive={isActive}
            categories={categories}
            itemRefs={itemRefs}
          />

          <DesktopHeaderNav
            isActive={isActive}
            desktopTrackRef={desktopTrackRef}
            categories={categories}
            closeTimer={closeTimer}
            setHoveredCat={setHoveredCat}
            isHoveringMega={isHoveringMega}
            itemRefs={itemRefs}
            scroll={scroll}
          />
        </div>
      </nav>

      {hoveredCat && (
        <ListProductHeader
          setIsHoveringMega={setIsHoveringMega}
          setHoveredCat={setHoveredCat}
          hoveredCat={hoveredCat}
          closeTimer={closeTimer}
        />
      )}
    </>
  );
}
