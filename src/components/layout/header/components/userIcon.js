"use client";

import { UserIcon as UserOutlineIcon } from "@heroicons/react/24/outline";

export default function UserIcon() {
  return (
    <UserOutlineIcon
      className="
        w-6 h-6
        cursor-pointer
        text-(--text-primary)
        hover:text-(--brand-accent)
        transition
      "
      aria-label="Cuenta de usuario"
    />
  );
}
