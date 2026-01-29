import apiFetch from "../../auth/client";

export async function getCategories() {
  return apiFetch("/ecommerce/categories");
}

export function getCatalogProducts(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) search.append(key, value);
  });

  return apiFetch(`/ecommerce/catalog?${search.toString()}`);
}
