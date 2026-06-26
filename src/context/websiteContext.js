"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useWebsite from "@/lib/utils/api/website/hooks/useWebsite";

const WebsiteContext = createContext(null);

export function WebsiteProvider({ children }) {
  const { getConfig } = useWebsite();

  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [getConfig]);

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
