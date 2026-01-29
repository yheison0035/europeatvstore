"use client";

import { useCallback, useEffect, useState } from "react";
import useSections from "@/lib/utils/api/hooks/useSections";
import HorizontalSection from "./horizontalSection";

export default function RelatedProducts({ productSlug }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { getRelatedProducts, loading } = useSections();

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const { data } = await getRelatedProducts(productSlug);
      setRelatedProducts(data);
    } catch (err) {
      console.error(err);
    }
  }, [getRelatedProducts, productSlug]);

  useEffect(() => {
    setRelatedProducts([]);
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  if (!loading && relatedProducts.length === 0) return null;

  return (
    <HorizontalSection
      title="Productos relacionados"
      subtitle="También te puede interesar"
      items={relatedProducts}
      loading={loading}
      type="product"
      layout="horizontal"
    />
  );
}
