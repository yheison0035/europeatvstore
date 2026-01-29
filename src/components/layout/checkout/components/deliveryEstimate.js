"use client";

import { TruckIcon } from "@heroicons/react/24/outline";
import { getEstimatedDelivery } from "@/utils/deliveryTime";

export default function DeliveryEstimate({ city }) {
  const estimate = getEstimatedDelivery(city);

  if (!estimate) return null;

  return (
    <div
      className="
        mt-4
        w-full
        flex items-start gap-3
        bg-(--bg-soft)
        border border-(--border-soft)
        rounded-lg
        p-3
      "
    >
      <TruckIcon className="w-5 h-5 text-(--brand-primary) shrink-0 mt-0.5" />

      <div className="flex-1 text-sm">
        <p className="font-medium text-(--text-primary)">Entrega estimada</p>

        <p className="text-(--text-muted)">
          Entre <strong>{estimate.from}</strong> y{" "}
          <strong>{estimate.to}</strong>
        </p>

        <p className="text-xs text-(--text-muted) mt-1">
          Envíos desde Itagüí, Antioquia
        </p>
      </div>
    </div>
  );
}
