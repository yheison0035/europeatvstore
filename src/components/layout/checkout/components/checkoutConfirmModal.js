"use client";

import {
  ShieldCheckIcon,
  CreditCardIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function CheckoutConfirmModal({
  onConfirm,
  onCancel,
  paymentMethod,
}) {
  const isOnline = paymentMethod === "online";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-(--bg-page) rounded-xl max-w-sm w-full p-6 shadow-(--shadow-lg)">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheckIcon className="w-6 h-6 text-(--success)" />
          <h3 className="text-lg font-semibold">Confirmar compra</h3>
        </div>

        <div
          className="
            flex items-center gap-3
            bg-(--bg-soft)
            border border-(--border-soft)
            rounded-lg
            p-3
            mb-4
          "
        >
          {isOnline ? (
            <CreditCardIcon className="w-5 h-5 text-(--brand-primary)" />
          ) : (
            <TruckIcon className="w-5 h-5 text-(--brand-primary)" />
          )}

          <div className="text-sm">
            <p className="font-medium text-(--text-primary)">Método de pago</p>
            <p className="text-(--text-muted)">
              {isOnline ? "Pago en línea (Wompi)" : "Pago contra entrega"}
            </p>
          </div>
        </div>

        <p className="text-sm text-(--text-muted)">
          {isOnline
            ? "Serás redirigido a la pasarela de pago para finalizar tu compra de forma segura."
            : "Recibirás tu pedido y pagarás directamente al mensajero al momento de la entrega."}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="
              flex-1
              border border-(--border-soft)
              rounded-lg
              py-2
              text-sm
              hover:bg-(--bg-soft)
              transition cursor-pointer
            "
          >
            Revisar
          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1
              bg-(--cta-primary)
              text-(--text-inverted)
              rounded-lg
              py-2
              text-sm
              font-medium
              hover:opacity-90
              transition cursor-pointer
            "
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
