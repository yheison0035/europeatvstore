import apiFetch from "../../auth/client";

/**
 * Crea el pedido en el CRM de la empresa dueña del dominio.
 * El backend descuenta stock y genera la venta + el envío.
 */
export async function createOrder(payload) {
  return apiFetch("/ecommerce/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
