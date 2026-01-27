"use client";

import { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={`
              w-16 h-16 rounded-lg border
              ${
                active === img
                  ? "border-(--brand-accent)"
                  : "border-(--border-soft)"
              }
            `}
          >
            <Image src={img} alt="" width={64} height={64} />
          </button>
        ))}
      </div>

      <div className="flex-1 border border-(--border-soft) rounded-2xl bg-(--bg-page)">
        <Zoom>
          <Image
            src={active}
            alt=""
            width={600}
            height={600}
            className="object-contain p-6"
            priority
          />
        </Zoom>
      </div>
    </div>
  );
}
