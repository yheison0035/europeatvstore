export const FREE_SHIPPING_FROM = 100000;

export const SHIPPING_RULES = [
  { min: 20000, max: 50000, price: 18000 },
  { min: 50001, max: 99999, price: 23000 },
];

export function calculateShipping(subtotal) {
  if (subtotal >= FREE_SHIPPING_FROM) {
    return {
      cost: 0,
      label: "Gratis",
      message: "¡Tu envío es gratis!",
    };
  }

  const rule = SHIPPING_RULES.find(
    (r) => subtotal >= r.min && subtotal <= r.max,
  );

  const cost = rule?.price || 0;

  return {
    cost,
    label: `$${cost.toLocaleString()}`,
    message: `Te faltan $${(
      FREE_SHIPPING_FROM - subtotal
    ).toLocaleString()} para envío gratis`,
  };
}
