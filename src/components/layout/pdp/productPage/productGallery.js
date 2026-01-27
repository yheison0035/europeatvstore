"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={`
              relative w-16 h-16 rounded-lg border overflow-hidden
              ${
                active === img
                  ? "border-(--brand-accent)"
                  : "border-(--border-soft)"
              }
            `}
          >
            <Image src={img} alt="" fill className="object-contain" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="relative flex-1 bg-(--bg-page) border border-(--border-soft) rounded-2xl overflow-hidden group">
        <Image
          src={active}
          alt=""
          width={700}
          height={700}
          priority
          className="
            object-contain
            w-full h-full
            transition-transform duration-300
            group-hover:scale-125
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
