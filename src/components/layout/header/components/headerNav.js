"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import { formatText } from "@/utils/textFormat";
import { usePathname } from "next/navigation";

const MENU_WIDTH = 520;
const EDGE_PADDING = 16;

export default function HeaderNav() {
  const { getCategories } = useCategories();
  const [categories, setCategories] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const [hoveredCat, setHoveredCat] = useState(null);
  const [isHoveringMega, setIsHoveringMega] = useState(false);

  const closeTimer = useRef(null);
  const trackRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    async function load() {
      const res = await getCategories();
      if (res?.success) setCategories(res.data);
    }
    load();
  }, [getCategories]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const check = () => {
      setShowArrows(el.scrollWidth > window.innerWidth);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [categories]);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const isActiveMobile = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleEnterCategory = (e, cat) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCat({ cat, rect });
  };

  const handleLeaveCategory = () => {
    closeTimer.current = setTimeout(() => {
      if (!isHoveringMega) setHoveredCat(null);
    }, 120);
  };

  const megaMenuStyle = hoveredCat
    ? (() => {
        const rawLeft =
          hoveredCat.rect.left + hoveredCat.rect.width / 2 - MENU_WIDTH / 2;

        const maxLeft = window.innerWidth - MENU_WIDTH - EDGE_PADDING;

        const safeLeft = Math.max(EDGE_PADDING, Math.min(rawLeft, maxLeft));

        return {
          top: hoveredCat.rect.bottom + 8,
          left: safeLeft,
          width: MENU_WIDTH,
        };
      })()
    : {};

  return (
    <>
      <nav className="bg-[var(--brand-primary)] text-white relative z-40">
        <div className="w-full px-4">
          <div className="flex md:hidden overflow-x-auto scrollbar-hide">
            <ul className="flex gap-6 py-3 whitespace-nowrap">
              <li>
                <Link
                  href="/"
                  className={`pb-1 ${
                    pathname === "/"
                      ? "border-b-2 border-white"
                      : "hover:text-[var(--brand-accent)]"
                  }`}
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/novedades"
                  className={`pb-1 ${
                    pathname === "/novedades"
                      ? "border-b-2 border-white"
                      : "hover:text-[var(--brand-accent)]"
                  }`}
                >
                  Novedades
                </Link>
              </li>

              {categories.map((cat) => {
                const slug = `/${cat.name.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <li key={cat.id}>
                    <Link
                      href={slug}
                      className={`pb-1 ${
                        isActiveMobile(slug)
                          ? "border-b-2 border-white"
                          : "hover:text-[var(--brand-accent)]"
                      }`}
                    >
                      {formatText(cat.name, "capitalize")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={`
                hidden md:flex items-center gap-4
                ${showArrows ? "justify-start" : "justify-center"}
            `}
          >
            <ul className="flex gap-6 py-3 whitespace-nowrap">
              <li>
                <Link
                  href="/"
                  className={`pb-1 ${
                    pathname === "/"
                      ? "border-b-2 border-white"
                      : "hover:text-[var(--brand-accent)]"
                  }`}
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/novedades"
                  className={`pb-1 ${
                    pathname === "/novedades"
                      ? "border-b-2 border-white"
                      : "hover:text-[var(--brand-accent)]"
                  }`}
                >
                  Novedades
                </Link>
              </li>
            </ul>

            {showArrows && (
              <button
                onClick={() => scroll("left")}
                className="p-1 cursor-pointer"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}

            <div
              ref={trackRef}
              className={`
                overflow-x-hidden
                ${showArrows ? "flex-1" : ""}
            `}
            >
              <ul
                className={`
                    flex gap-6 py-3 whitespace-nowrap
                    ${showArrows ? "justify-start" : "justify-center"}
                `}
              >
                {categories.map((cat) => {
                  const slug = `/${cat.name.toLowerCase().replace(/\s+/g, "-")}`;

                  return (
                    <li
                      key={cat.id}
                      onMouseEnter={(e) => handleEnterCategory(e, cat)}
                      onMouseLeave={handleLeaveCategory}
                    >
                      <Link
                        href={slug}
                        className="flex items-center gap-1 hover:text-[var(--brand-accent)]"
                      >
                        {formatText(cat.name, "capitalize")}
                        <ChevronDownIcon className="w-4 h-4" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {showArrows && (
              <button
                onClick={() => scroll("right")}
                className="p-1 cursor-pointer"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {hoveredCat && (
        <div
          onMouseEnter={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setIsHoveringMega(true);
          }}
          onMouseLeave={() => {
            setIsHoveringMega(false);
            setHoveredCat(null);
          }}
          className="
            hidden md:block
            fixed
            bg-white
            shadow-2xl
            rounded-xl
            z-[9999]
            p-6
            mt-1
            "
          style={megaMenuStyle}
        >
          <p className="font-semibold text-lg mb-4">
            {formatText(hoveredCat.cat.name, "capitalize")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-3 flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-20 bg-gray-100 rounded mb-2" />
                <p className="text-sm font-medium text-center">Producto {i}</p>
                <span className="text-xs text-gray-500">$000.000</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center">
            <Link
              href={`/${hoveredCat.cat.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="
                text-sm font-medium
                text-[var(--brand-primary)]
                hover:text-[var(--brand-accent)]
                flex items-center gap-1
                "
            >
              Ver todos los productos
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
