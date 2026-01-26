"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "europeatvstore_cookie_consent";

export default function CookieConsent({ onVisibleChange }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);

    if (!consent) {
      setVisible(true);
      onVisibleChange(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    onVisibleChange(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-(--bg-dark) px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-(--text-muted)">
          Utilizamos cookies para mejorar tu experiencia. Consulta nuestra{" "}
          <Link
            href="/legal/politicas-de-privacidad"
            className="underline hover:text-(--brand-accent)"
          >
            Política de Privacidad
          </Link>
          .
        </p>

        <button
          onClick={acceptCookies}
          className="bg-(--brand-accent) text-(--bg-dark) px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
}
