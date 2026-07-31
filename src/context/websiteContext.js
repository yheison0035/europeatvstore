"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useWebsite from "@/lib/utils/api/website/hooks/useWebsite";

const WebsiteContext = createContext(null);

/**
 * Configuración del negocio dueño del dominio.
 *
 * Llega ya resuelta desde el servidor (`initialWebsite`): así el logo, el
 * buscador y el menú están en el primer pintado y el header no cambia de
 * altura después, que era lo que dejaba el contenido debajo del menú al
 * recargar.
 */
export function WebsiteProvider({ children, initialWebsite = null }) {
  const { getConfig } = useWebsite();

  const [website, setWebsite] = useState(initialWebsite);
  const [loading, setLoading] = useState(!initialWebsite);

  useEffect(() => {
    if (initialWebsite) return;

    async function loadWebsite() {
      try {
        const response = await getConfig();

        setWebsite(response);
      } catch (error) {
        console.error("Error cargando configuración del sitio", error);
      } finally {
        setLoading(false);
      }
    }

    loadWebsite();
  }, [getConfig, initialWebsite]);

  return (
    <WebsiteContext.Provider
      value={{
        website,
        loading,
        reloadWebsite: async () => {
          const response = await getConfig();
          setWebsite(response);
        },
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsiteContext() {
  const context = useContext(WebsiteContext);

  if (!context) {
    throw new Error("useWebsiteContext debe usarse dentro de WebsiteProvider");
  }

  return context;
}
