// Normaliza texto: quita tildes, pasa a mayúsculas, elimina caracteres especiales y espacios extras
export function formatText(input) {
  if (!input) return "";

  return input
    .normalize("NFD") // separa tildes (á → a)
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toUpperCase() // todo en mayúscula
    .replace(/[^A-Z0-9 ]/g, "") // solo letras, números y espacios
    .replace(/\s+/g, " ") // un solo espacio
    .trim(); // sin espacios al inicio/final
}

// Normaliza texto: quita tildes, pasa a mayúsculas y elimina espacios extras
export function normalizeText(text) {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}
