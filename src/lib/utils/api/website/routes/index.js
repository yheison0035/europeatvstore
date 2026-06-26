import apiFetch from "../../auth/client";

export async function getWebsiteConfig() {
  return apiFetch("/website/config");
}
