"use client";

import { useEffect, useState } from "react";
import useSections from "@/lib/utils/api/hooks/useSections";
import HorizontalSection from "./horizontalSection";

export default function OffersSection() {
  const { getOffers } = useSections();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const res = await getOffers();
      if (mounted && res?.success) {
        setOffers(res.data || []);
      }
      if (mounted) setLoading(false);
    }

    load();
    return () => (mounted = false);
  }, [getOffers]);

  if (!loading && offers.length === 0) return null;

  return (
    <HorizontalSection
      title="Ofertas"
      subtitle="Descuentos que no duran"
      items={offers}
      loading={loading}
      type="product"
      layout="horizontal"
    />
  );
}
