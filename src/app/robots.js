export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*?*colors=", "/*?*brands=", "/*?*sort="],
      },
    ],
    sitemap: "https://www.europeatvstore.com/sitemap.xml",
  };
}
