export function unslugify(text) {
  if (!text) return "";

  return text
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
