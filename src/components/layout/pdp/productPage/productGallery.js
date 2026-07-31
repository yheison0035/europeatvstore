"use client";

import { useState } from "react";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/website";

export default function ProductGallery({ images = [] }) {
  const safeImages = Array.isArray(images) ? images : [];
  const [active, setActive] = useState(safeImages[0] || null);

  if (!safeImages.length) {
    return (
      <div className="bg-white border border-(--border-soft) rounded-2xl h-80 flex items-center justify-center overflow-hidden">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt="Producto sin imagen"
          width={320}
          height={320}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
        {safeImages.map((img, i) => (
          <button
            key={`${img}-${i}`}
            onClick={() => setActive(img)}
            className={`
              relative shrink-0 w-16 h-16 rounded-lg border overflow-hidden cursor-pointer
              ${
                active === img
                  ? "border-(--brand-accent)"
                  : "border-(--border-soft)"
              }
            `}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="64px"
              className="object-contain"
              unoptimized
            />
          </button>
        ))}
      </div>

      <div className="relative flex-1 bg-white border border-(--border-soft) rounded-2xl overflow-hidden group">
        <Image
          src={active}
          alt="img-gallery"
          width={700}
          height={700}
          priority
          unoptimized
          className="
            w-full h-full object-contain
            transition-transform duration-300
            lg:group-hover:scale-125
            cursor-zoom-in
          "
        />

        <span className="hidden lg:block absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded">
          Pasa el mouse para ampliar
        </span>
      </div>
    </div>
  );
}
