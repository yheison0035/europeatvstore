"use client";

import { useCallback, useEffect, useState } from "react";
import Container from "../container";
import Footer from "../footer";

import ProductGallery from "./productPage/productGallery";
import ProductInfo from "./productPage/productInfo";
import ProductDescription from "./productPage/productDescription";
import useProducts from "@/lib/utils/api/hooks/useProducts";
import Breadcrumbs from "../catalog/breadcrumbs";
import NewsSection from "@/components/sections/newsSection";
import OffersSection from "@/components/sections/offersSection";
import SectionWrapper from "../sectionWrapper";
import RelatedProducts from "@/components/sections/relatedProductsSection";
import { slugifyCategory } from "@/utils/slugify";
import ProductSchema from "@/components/seo/productSchema";

export default function ProductPage({ category, productSlug }) {
  const [product, setProduct] = useState(null);
  const { getProductBySlug } = useProducts();

  const fetchProductBySlug = useCallback(async () => {
    try {
      const res = await getProductBySlug(productSlug);
      if (res?.success && res.data) {
        setProduct(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [getProductBySlug, productSlug]);

  useEffect(() => {
    fetchProductBySlug();
  }, [fetchProductBySlug]);

  if (!product) return null;

  return (
    <>
      <ProductSchema product={product} category={category} />
      <main className="bg-(--bg-soft)">
        <Container>
          <SectionWrapper>
            <div className="pt-8">
              <Breadcrumbs category={category} product={product.name} />

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
                <ProductGallery images={product.images} />

                <ProductInfo product={product} category={category} />
              </section>
              <ProductDescription product={product} />
            </div>
          </SectionWrapper>

          <SectionWrapper>
            <RelatedProducts productSlug={slugifyCategory(product.name)} />
          </SectionWrapper>
          <SectionWrapper>
            <NewsSection />
          </SectionWrapper>
          <SectionWrapper>
            <OffersSection />
          </SectionWrapper>
        </Container>
      </main>

      <Footer />
    </>
  );
}
