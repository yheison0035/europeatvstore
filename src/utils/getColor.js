import { colorOptions } from "./colorOptions";

/**
 * Devuelve el color HEX según el nombre
 * Si no existe, devuelve gris claro
 */
export function getColorHexByName(name) {
  if (!name) return "#E5E7EB";

  const found = colorOptions.find(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );

  return found?.hex || "#E5E7EB";
}
