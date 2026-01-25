"use client";

import { useEffect, useState } from "react";
import useSections from "@/lib/utils/api/hooks/useSections";
import HorizontalSection from "./horizontalSection";

export default function NewsSection() {
  const { getNews } = useSections();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const res = await getNews();
      if (mounted && res?.success) {
        setNews(res.data || []);
      }
      if (mounted) setLoading(false);
    }

    load();
    return () => (mounted = false);
  }, [getNews]);

  if (!loading && news.length === 0) return null;

  return (
    <HorizontalSection
      title="Novedades"
      subtitle="Lo último que llegó para ti"
      items={news}
      loading={loading}
      type="product"
      layout="horizontal"
    />
  );
}
