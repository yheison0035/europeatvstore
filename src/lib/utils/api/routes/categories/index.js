import apiFetch from "../../auth/client";

export async function getCategories() {
  return apiFetch("/ecommerce/categories");
}

export async function getCatalogProducts(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value);
  });

  return apiFetch(`/ecommerce/catalog?${query.toString()}`);
}
