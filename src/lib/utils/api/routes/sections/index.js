import apiFetch from "../../auth/client";

export async function getNews() {
  return apiFetch("/ecommerce/novedades");
}

export async function getOffers() {
  return apiFetch("/ecommerce/ofertas");
}
