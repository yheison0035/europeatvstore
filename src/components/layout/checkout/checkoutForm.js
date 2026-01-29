"use client";

import { useCheckout } from "@/context/checkoutContext";
import PaymentMethods from "./paymentMethods";
import { Input } from "./components/input";
import Card from "./components/card";
import ShippingLocationBlock from "./components/shippingLocationBlock";

export default function CheckoutForm() {
  const {
    formData,
    handleChange,
    isLocked,
    setIsLocked,
    paymentMethod,
    setPaymentMethod,
    showErrors,
    isFormValid,
  } = useCheckout();

  const { errors } = isFormValid();

  return (
    <section className="lg:col-span-2 space-y-6">
      <Card title="Datos de contacto">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={showErrors && errors.email}
          helperText={errors.email}
        />
      </Card>

      <Card
        title="Dirección de envío"
        description="Usaremos esta información para coordinar la entrega de tu pedido"
        action={
          isLocked && (
            <button
              onClick={() => setIsLocked(false)}
              className="text-sm text-(--brand-accent) font-medium hover:underline"
            >
              Cambiar ciudad
            </button>
          )
        }
      >
        <ShippingLocationBlock
          formData={formData}
          handleChange={handleChange}
          isLocked={isLocked}
          errors={showErrors ? errors : {}}
          required={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Input
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={showErrors && errors.firstName}
          />

          <Input
            label="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={showErrors && errors.lastName}
          />

          <Input
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={showErrors && errors.phone}
          />

          <Input
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Ej: Calle 45 #12-34"
            error={showErrors && errors.address}
          />
        </div>

        <div className="mt-6 rounded-xl border border-(--border-soft) bg-(--bg-soft) p-4 space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="isHardToAccess"
              checked={formData.isHardToAccess}
              onChange={handleChange}
              className="mt-1 cursor-pointer"
            />

            <div className="flex flex-col">
              <span className="text-sm font-medium text-(--text-primary)">
                Dirección de difícil acceso
              </span>
              <span className="text-xs text-(--text-muted)">
                Zona rural, finca, vereda o sin nomenclatura
              </span>
            </div>
          </div>

          {formData.isHardToAccess && (
            <div className="pt-3 border-t border-(--border-soft)">
              <Input
                label="Referencias para llegar"
                name="addressDetail"
                value={formData.addressDetail}
                onChange={handleChange}
                placeholder="Ej: Finca El Paraíso, portón verde, a 300m del colegio"
              />

              <p className="mt-1 text-xs text-(--text-muted)">
                Esto ayuda a evitar retrasos o devoluciones del pedido
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Input
            label="Barrio"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            required
            error={showErrors && errors.neighborhood}
          />
        </div>
      </Card>

      <Card title="Datos de facturación">
        <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer hover:underline">
          <input
            type="checkbox"
            name="billingSameAsShipping"
            checked={formData.billingSameAsShipping}
            onChange={handleChange}
            className="cursor-pointer"
          />
          Mis datos de facturación son los mismos del envío
        </label>

        <Input
          label="Documento (CC / NIT / CE)"
          name="documentNumber"
          value={formData.documentNumber}
          onChange={handleChange}
          required
          error={showErrors && errors.documentNumber}
        />

        {!formData.billingSameAsShipping && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <Input
              label="Nombre"
              name="billingFirstName"
              value={formData.billingFirstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Apellido"
              name="billingLastName"
              value={formData.billingLastName}
              onChange={handleChange}
              required
            />
            <Input
              label="Teléfono"
              name="billingPhone"
              value={formData.billingPhone}
              onChange={handleChange}
              required
            />
            <Input
              label="Dirección"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </Card>

      <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
    </section>
  );
}
