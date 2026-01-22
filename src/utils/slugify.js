export function slugifyCategory(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // guiones
    .replace(/[^a-z0-9-]/g, "");
}
