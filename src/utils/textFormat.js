export function formatText(text, type = "capitalize") {
  if (!text) return "";

  switch (type) {
    case "lower":
      return text.toLowerCase();

    case "upper":
      return text.toUpperCase();

    case "capitalize":
      return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    default:
      return text;
  }
}
