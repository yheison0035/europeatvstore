"use client";

import Image from "next/image";
import Link from "next/link";

export default function SimpleHeader() {
  return (
    <header className="bg-(--bg-page) border-b border-(--border-soft)">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <Link href="/" className="text-xl font-bold text-(--brand-primary)">
          <Image
            src="/logo.png"
            alt="EUROPEATVSTORE – Tecnología y Hogar"
            width={70}
            height={70}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
