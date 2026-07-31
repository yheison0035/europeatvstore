/**
 * Datos estructurados (JSON-LD) de la tienda.
 *
 * Todo sale de la empresa dueña del dominio: no hay ningún dato fijo. Se
 * generan en el servidor para que los buscadores los vean en el HTML sin
 * tener que ejecutar JavaScript.
 */

const COUNTRY = "CO";
const CURRENCY = "COP";

function clean(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0),
    ),
  );
}

export function siteName(website) {
  return (
    website?.company?.websiteName || website?.company?.name || "Tienda online"
  );
}

export function siteDescription(website) {
  return (
    website?.settings?.metaDescription ||
    `Compra online en ${siteName(website)} con envíos a todo el país.`
  );
}

/** Redes sociales configuradas, para `sameAs`. */
function socialProfiles(website) {
  const settings = website?.settings || {};

  return [
    settings.instagram,
    settings.facebook,
    settings.tiktok,
    settings.youtube,
  ].filter(Boolean);
}

/** Teléfono en formato internacional para los datos estructurados. */
function contactPhone(website) {
  const raw = (
    website?.settings?.whatsapp ||
    website?.company?.phone ||
    ""
  ).replace(/\D/g, "");

  if (!raw) return "";

  return raw.length === 10 ? `+57${raw}` : `+${raw}`;
}

/** La tienda como negocio: nombre, logo, contacto, dirección y redes. */
export function buildStoreSchema(website, siteUrl) {
  if (!website?.company) return null;

  const company = website.company;
  const local = website?.settings?.ecommerceLocal;
  const phone = contactPhone(website);

  const address = local
    ? clean({
        "@type": "PostalAddress",
        streetAddress: website?.settings?.address || local.address,
        addressLocality: local.city,
        addressRegion: local.department,
        addressCountry: COUNTRY,
      })
    : null;

  return clean({
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#store`,
    name: siteName(website),
    legalName: company.name,
    description: siteDescription(website),
    url: siteUrl,
    logo: company.logo,
    image: company.logo,
    email: company.email,
    telephone: phone,
    address,
    currenciesAccepted: CURRENCY,
    areaServed: COUNTRY,
    sameAs: socialProfiles(website),
    contactPoint: phone
      ? {
          "@type": "ContactPoint",
          telephone: phone,
          contactType: "customer service",
          areaServed: COUNTRY,
          availableLanguage: ["Spanish"],
        }
      : undefined,
  });
}

/** El sitio en sí, con la caja de búsqueda que Google puede mostrar. */
export function buildWebSiteSchema(website, siteUrl) {
  if (!website?.company) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName(website),
    description: siteDescription(website),
    url: siteUrl,
    inLanguage: "es-CO",
    publisher: { "@id": `${siteUrl}/#store` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?buscar={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(siteUrl, trail = []) {
  if (trail.length === 0) return null;

  const items = [{ name: "Inicio", url: siteUrl }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildProductSchema({ product, category, website, siteUrl }) {
  if (!product) return null;

  const url = `${siteUrl}/${category}/${product.slug}`;

  // La ficha no trae un stock total: se suma el de las variantes.
  const stock =
    product.stock ??
    product.colors?.reduce((total, color) => total + (color.stock || 0), 0);

  const inStock = stock === undefined || stock > 0;

  // Google pide una fecha de validez del precio; un año es lo habitual.
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  return clean({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description,
    image: product.images,
    sku: String(product.id),
    url,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    offers: clean({
      "@type": "Offer",
      url,
      priceCurrency: CURRENCY,
      price: product.price,
      priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": `${siteUrl}/#store` },
    }),
  });
}

/** Listado de productos de una categoría, para que Google entienda la página. */
export function buildItemListSchema({ products, category, siteUrl, name }) {
  if (!products?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/${category}/${product.slug}`,
      name: product.name,
    })),
  };
}

/** Convierte un slug de URL en un nombre legible ("belleza-mujer" → "Belleza Mujer"). */
export function humanize(slug) {
  return (slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
