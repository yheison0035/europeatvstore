"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWebsiteContext } from "@/context/websiteContext";
import { getCompanyName } from "@/lib/website";

/**
 * Portada de la tienda: banners que la empresa sube desde el CRM y, si no hay,
 * el título/subtítulo configurados. Si no hay nada, no se pinta nada.
 */
export default function HeroSection() {
  const { website } = useWebsiteContext();

  const company = website?.company;

  const banners = (website?.banners || []).filter(
    (banner) => banner.active !== false && banner.type === "HOME",
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % banners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length > 0) {
    const banner = banners[Math.min(current, banners.length - 1)];

    return (
      <section className="relative overflow-hidden rounded-(--radius-lg)">
        <div className="relative aspect-[21/9] w-full bg-(--bg-muted)">
          {/* Los banners pueden venir de cualquier dominio: se usa <img>. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image}
            alt={banner.title || getCompanyName(website)}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {(banner.title || banner.subtitle || banner.buttonText) && (
            <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-gradient-to-r from-black/60 to-transparent px-6 md:px-12">
              {banner.title && (
                <h2 className="max-w-xl text-2xl font-bold text-white md:text-4xl">
                  {banner.title}
                </h2>
              )}

              {banner.subtitle && (
                <p className="max-w-lg text-sm text-white/90 md:text-base">
                  {banner.subtitle}
                </p>
              )}

              {banner.buttonText && banner.buttonUrl && (
                <Link
                  href={banner.buttonUrl}
                  className="
                    w-fit rounded-(--radius-md)
                    bg-(--cta-primary) px-5 py-2.5
                    text-sm font-medium text-(--text-inverted)
                    transition hover:opacity-90
                  "
                >
                  {banner.buttonText}
                </Link>
              )}
            </div>
          )}
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((item, index) => (
              <button
                key={item.id ?? index}
                type="button"
                aria-label={`Ir al banner ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current ? "w-6 bg-white" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  if (!company?.heroTitle && !company?.heroSubtitle) return null;

  return (
    <section
      className="
        rounded-(--radius-lg)
        bg-(--brand-primary)
        px-6 py-12 text-center md:px-12 md:py-16
      "
    >
      {company.heroTitle && (
        <h2 className="text-2xl font-bold text-(--text-inverted) md:text-4xl">
          {company.heroTitle}
        </h2>
      )}

      {company.heroSubtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-(--text-inverted)/80 md:text-base">
          {company.heroSubtitle}
        </p>
      )}
    </section>
  );
}
