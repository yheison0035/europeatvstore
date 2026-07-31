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

export default function ProductPage({ category, productSlug, initialProduct = null }) {
  // El producto ya viene resuelto del servidor (así sale en el HTML); solo se
  // vuelve a pedir si por algo no llegó.
  const [product, setProduct] = useState(initialProduct);
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
    if (initialProduct) return;
    fetchProductBySlug();
  }, [fetchProductBySlug, initialProduct]);

  if (!product) return null;

  return (
    <>
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
            <RelatedProducts productSlug={product.slug} />
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
