"use client";

import { UserIcon as UserOutlineIcon } from "@heroicons/react/24/outline";

export default function UserIcon() {
  return (
    <UserOutlineIcon
      className="
        w-6 h-6
        cursor-pointer
        text-[var(--text-primary)]
        hover:text-[var(--brand-accent)]
        transition
      "
      aria-label="Cuenta de usuario"
    />
  );
}
