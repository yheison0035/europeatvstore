import { fetchFromApi, getSiteUrl } from "@/lib/website.server";
import { legalDocuments } from "@/lib/legal/legalDocuments";

/**
 * Sitemap dinámico: el dominio y las categorías salen de la empresa dueña
 * del dominio por el que entra la petición, no de una lista fija.
 */
export const dynamic = "force-dynamic";

function slugify(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function sitemap() {
  const baseUrl = await getSiteUrl();

  const now = new Date();

  const staticPages = ["", "/novedades", "/ofertas"].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  }));

  /** CATEGORÍAS */
  let categoryUrls = [];

  try {
    const categories = await fetchFromApi("/ecommerce/categories");

    categoryUrls = (categories?.data || [])
      .map((category) => slugify(category.name))
      .filter(Boolean)
      .map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Sitemap categories error:", error);
  }

  /** PRODUCTOS */
  let productUrls = [];

  try {
    const products = await fetchFromApi("/ecommerce/sitemap/products");

    productUrls = (products || [])
      .filter((product) => product.slug && product.category)
      .map((product) => ({
        url: `${baseUrl}/${product.category}/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));
  } catch (error) {
    console.error("Sitemap products error:", error);
  }

  /** PÁGINAS LEGALES (dan confianza y las pide la SIC) */
  const legalUrls = legalDocuments.map((doc) => ({
    url: `${baseUrl}/legal/${doc.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticPages, ...categoryUrls, ...productUrls, ...legalUrls];
}
