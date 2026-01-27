export const filtersConfig = {
  colors: [
    { label: "Blanco", value: "blanco" },
    { label: "Negro", value: "negro" },
    { label: "Gris", value: "gris" },
  ],
  brands: [
    { label: "Lemman", value: "lemman" },
    { label: "EUROPEATVSTORE", value: "europeatvstore" },
    { label: "Samsung", value: "samsung" },
  ],
  price: {
    min: 0,
    max: 5_000_000,
  },
  sort: [
    { label: "Precio: menor a mayor", value: "price_asc" },
    { label: "Precio: mayor a menor", value: "price_desc" },
    { label: "A - Z", value: "name_asc" },
    { label: "Z - A", value: "name_desc" },
  ],
};
