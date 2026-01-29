"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CheckoutBackLink() {
  return (
    <div className="mb-4">
      <Link
        href="/"
        className="
          inline-flex items-center gap-1
          text-sm text-(--text-muted)
          hover:text-(--brand-primary)
          transition
        "
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Volver al carrito
      </Link>
    </div>
  );
}
