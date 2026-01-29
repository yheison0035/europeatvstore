import { MetadataRoute } from "next";

const BASE_URL = "https://www.europeatvstore.com";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.europeatvstore.com";

/**
 * Sitemap dinámico para EUROPEATVSTORE
 * ✔ Compatible con Next 16
 * ✔ Sin filtros indexables
 * ✔ Seguro en build
 */
export default async function sitemap() {
  /** ===============================
   * PÁGINAS ESTÁTICAS
   * =============================== */
  const staticPages = ["", "/novedades", "/ofertas"];

  /** ===============================
   * CATEGORÍAS
   * =============================== */
  const staticCategories = [
    "novedades",
    "ofertas",
    "aseo",
    "barberia",
    "belleza-mujer",
    "cocina",
    "deportes",
    "herramientas",
    "humificadores",
    "jugueteria",
    "proyectores-y-video",
    "salud-y-bienestar",
    "streaming",
    "utensilios-de-cocina",
  ];

  const categoryUrls = staticCategories.map((category) => ({
    url: `${BASE_URL}/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /** ===============================
   * PRODUCTOS (BACKEND)
   * =============================== */
  let productUrls = [];

  try {
    const res = await fetch(`${API_URL}/ecommerce/sitemap/products`, {
      next: { revalidate: 86400 }, // 1 día
    });

    if (res.ok) {
      const products = await res.json();

      productUrls = products
        .filter((p) => p.slug && p.category)
        .map((product) => ({
          url: `${BASE_URL}/${product.category}/${product.slug}`,
          lastModified: new Date(product.updatedAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.9,
        }));
    }
  } catch (error) {
    console.error("Sitemap products error:", error);
  }

  /** ===============================
   * RESULTADO FINAL
   * =============================== */
  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    })),
    ...categoryUrls,
    ...productUrls,
  ];
}
