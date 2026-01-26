"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import DesktopHeaderNav from "./headerNav/desktopHeaderNav";
import MobileHeaderNav from "./headerNav/mobileHeaderNav";
import ListProductHeader from "./headerNav/listProducts";

export default function HeaderNav() {
  const { getCategories } = useCategories();
  const pathname = usePathname();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [isHoveringMega, setIsHoveringMega] = useState(false);

  const closeTimer = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      if (res?.success) setCategories(res.data || []);
    })();
  }, [getCategories]);

  const activeSlug = pathname === "/" ? "home" : pathname.split("/")[1];

  const handleNavigate = (slug) => {
    if (slug === "home") router.push("/");
    else if (slug === "novedades") router.push("/novedades");
    else router.push(`/${slug}`);
  };

  return (
    <>
      <nav className="bg-(--brand-primary) text-white relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <MobileHeaderNav
            categories={categories}
            activeSlug={activeSlug}
            onNavigate={handleNavigate}
          />

          <DesktopHeaderNav
            categories={categories}
            activeSlug={activeSlug}
            onNavigate={handleNavigate}
            closeTimer={closeTimer}
            setHoveredCat={setHoveredCat}
            isHoveringMega={isHoveringMega}
          />
        </div>
      </nav>

      {hoveredCat && (
        <ListProductHeader
          hoveredCat={hoveredCat}
          setHoveredCat={setHoveredCat}
          setIsHoveringMega={setIsHoveringMega}
          closeTimer={closeTimer}
        />
      )}
    </>
  );
}
