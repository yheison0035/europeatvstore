import { headers } from "next/headers";

/**
 * Utilidades de servidor para resolver de QUÉ negocio es la petición.
 *
 * La tienda es multi-tenant: la misma app sirve a varias empresas y lo único
 * que las distingue es el dominio por el que entra el visitante. El backend
 * espera ese dominio en la cabecera `X-Website-Domain` (no se puede usar
 * `host`: fetch de Node lo ignora por ser una cabecera prohibida).
 */

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"
).replace(/\/$/, "");

/** Permite forzar un dominio en local (donde el host sería "localhost"). */
const FORCED_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "";

function cleanHost(value) {
  return (value || "").split(",")[0].trim().toLowerCase();
}

/** Host real de la petición (respetando el proxy de Vercel/Railway). */
export async function getRequestHost() {
  const headersList = await headers();

  return (
    cleanHost(headersList.get("x-forwarded-host")) ||
    cleanHost(headersList.get("host")) ||
    ""
  );
}

/** Dominio con el que se identifica la empresa ante el backend. */
export async function getWebsiteDomain() {
  if (FORCED_DOMAIN) return cleanHost(FORCED_DOMAIN);

  return await getRequestHost();
}

/** URL pública del sitio, para canonicals, sitemap y Open Graph. */
export async function getSiteUrl() {
  const host = (await getRequestHost()) || cleanHost(FORCED_DOMAIN);

  const protocol =
    host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https";

  return `${protocol}://${host}`;
}

/** Llama al backend identificando la empresa por su dominio. */
export async function fetchFromApi(path, options = {}) {
  const domain = await getWebsiteDomain();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "X-Website-Domain": domain,
    },
    cache: options.cache || "no-store",
  });

  if (!res.ok) {
    console.error(
      `API ${path} respondió ${res.status} para el dominio "${domain}"`,
    );
    return null;
  }

  return await res.json();
}

/** Configuración del sitio (empresa, ajustes, banners). Null si no resuelve. */
export async function getWebsiteConfig() {
  try {
    return await fetchFromApi("/website/config");
  } catch (error) {
    console.error("No se pudo cargar la configuración del sitio", error);
    return null;
  }
}
