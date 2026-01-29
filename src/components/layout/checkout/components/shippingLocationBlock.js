"use client";

import DepartaCiudad from "@/components/ui/select/depart_ciud";
import DeliveryEstimate from "./deliveryEstimate";

export default function ShippingLocationBlock({
  formData,
  handleChange,
  isLocked,
  errors = {},
  required,
}) {
  return (
    <div className="flex flex-col gap-4">
      <DepartaCiudad
        formData={formData}
        handleChange={handleChange}
        isLocked={isLocked}
        errors={errors}
        required={required}
      />

      {errors.department && (
        <p className="text-xs text-(--danger)">Selecciona un departamento</p>
      )}

      {errors.city && (
        <p className="text-xs text-(--danger)">Selecciona una ciudad</p>
      )}

      <DeliveryEstimate city={formData.city} />
    </div>
  );
}
