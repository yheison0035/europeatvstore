import apiFetch from "../../auth/client";

export async function getCategories() {
  return apiFetch("/ecommerce/categories");
}

export async function getProductsByCategory(slug, filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const query = params.toString();
  const url = query
    ? `/ecommerce/category/${slug}?${query}`
    : `/ecommerce/category/${slug}`;

  return apiFetch(url);
}
