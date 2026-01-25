"use client";

import { useEffect, useState } from "react";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import HorizontalSection from "./horizontalSection";

export default function CategoriesSection() {
  const { getCategories } = useCategories();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await getCategories();
        if (mounted && res?.success) {
          setCategories(res.data || []);
        }
      } catch (e) {
        console.error("Error cargando categorías", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [getCategories]);

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <HorizontalSection
      title="Categorías"
      subtitle="Encuentra fácilmente lo que estás buscando"
      items={categories}
      loading={loading}
      type="category"
      layout="grid"
      itemsPerPageDesktop={6} // 3 x 2
      itemsPerPageMobile={4} // 2 x 2
    />
  );
}
