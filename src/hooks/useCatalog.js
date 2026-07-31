"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useCategories from "@/lib/utils/api/hooks/useCategories";

/**
 * Listado de un catálogo (categoría, novedades u ofertas).
 *
 * La primera carga llega ya resuelta desde el servidor (`initialCatalog`) para
 * que los productos estén en el HTML: es lo que ven los buscadores y evita el
 * parpadeo. Solo se vuelve a pedir cuando cambian los filtros o la categoría.
 *
 * La API devuelve el listado completo de una vez (no pagina), así que aquí no
 * se acumulan páginas: cada carga reemplaza el resultado. Antes se iban
 * concatenando y, con 12 productos justos, se repetían indefinidamente.
 */
export function useCatalog(catalogParams, initialCatalog = null) {
  const { getCatalogProducts } = useCategories();

  const [products, setProducts] = useState(initialCatalog?.data || []);
  const [filters, setFilters] = useState(initialCatalog?.filters || null);
  const [loading, setLoading] = useState(!initialCatalog);

  // Los datos del servidor valen para la primera vez; a partir de ahí manda
  // lo que pida el usuario con los filtros.
  const usedInitial = useRef(Boolean(initialCatalog));

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getCatalogProducts(catalogParams);

      if (res?.success) {
        setProducts(res.data);
        setFilters(res.filters);
      }
    } catch (error) {
      console.error("No se pudo cargar el catálogo", error);
    } finally {
      setLoading(false);
    }
  }, [catalogParams, getCatalogProducts]);

  useEffect(() => {
    if (usedInitial.current) {
      usedInitial.current = false;
      return;
    }

    load();
  }, [load]);

  return {
    products,
    filters,
    loading,
    // Se mantienen por compatibilidad con el listado; la API no pagina.
    loadMore: () => {},
    hasMore: false,
    loadingMore: loading,
  };
}
