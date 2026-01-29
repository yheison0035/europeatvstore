"use client";

import { useCallback, useEffect, useState } from "react";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import HorizontalSection from "./horizontalSection";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const { getCategories, loading } = useCategories();

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }, [getCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
