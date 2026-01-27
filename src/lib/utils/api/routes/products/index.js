import apiFetch from "../../auth/client";

export async function getProducts() {
  return apiFetch("/inventory");
}

export async function getProductById(id) {
  return apiFetch(`/inventory/${id}`);
}

export async function searchProducts(term) {
  if (!term || term.length < 2) return { data: [] };
  return apiFetch(`/ecommerce/search/${term}`);
}

export async function getProductBySlug(productSlug) {
  return apiFetch(`/ecommerce/product/${productSlug}`);
}
