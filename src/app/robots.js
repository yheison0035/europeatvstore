import { getSiteUrl } from "@/lib/website.server";

export const dynamic = "force-dynamic";

export default async function robots() {
  const baseUrl = await getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*?*colors=", "/*?*brands=", "/*?*sort="],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
