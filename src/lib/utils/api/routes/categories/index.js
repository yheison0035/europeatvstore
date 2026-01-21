import apiFetch from "../../auth/client";

export async function getCategories() {
  return apiFetch("/ecommerce/categories");
}

export async function getCategoryById(id) {
  return apiFetch(`/ecommerce/categories/${id}`);
}
