import apiFetch from "../../auth/client";

export async function getCategories() {
  return apiFetch("/categories");
}

export async function getCategoryById(id) {
  return apiFetch(`/categories/${id}`);
}
