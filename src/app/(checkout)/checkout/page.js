"use client";

import { useCheckout } from "@/context/checkoutContext";
import CheckoutBackLink from "@/components/layout/checkout/components/checkoutBackLink";
import CheckoutContainer from "@/components/layout/checkout/components/checkoutContainer";
import CheckoutForm from "@/components/layout/checkout/checkoutForm";
import CheckoutLoader from "@/components/layout/checkout/components/checkoutLoader";
import CheckoutSummary from "@/components/layout/checkout/checkoutSummary";
import CheckoutConfirmModal from "@/components/layout/checkout/components/checkoutConfirmModal";
import { useCart } from "@/context/cartContext";
import { calculateShipping } from "@/utils/shipping";
import { openWompiCheckout } from "@/lib/wompi/wompiCheckout";

export default function CheckoutPage() {
  const {
    isSubmitting,
    showConfirm,
    setShowConfirm,
    setIsSubmitting,
    paymentMethod,
    formData,
  } = useCheckout();

  const { items } = useCart();

  function handleConfirm() {
    setShowConfirm(false);

    if (paymentMethod === "online") {
      if (!window.WidgetCheckout) {
        alert("La pasarela de pago no está disponible");
        return;
      }

      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      const { cost } = calculateShipping(subtotal);
      const total = subtotal + cost;

      openWompiCheckout({
        amount: total,
        reference: `ORDER-${Date.now()}`,
        customerEmail: formData.email,
      });

      return;
    }

    if (paymentMethod === "cod") {
      setIsSubmitting(true);
      console.log("Crear orden contra entrega");
    }
  }

  return (
    <>
      <CheckoutContainer>
        <CheckoutBackLink />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24 lg:pb-0">
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </CheckoutContainer>

      {showConfirm && (
        <CheckoutConfirmModal
          paymentMethod={paymentMethod}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}

      {isSubmitting && <CheckoutLoader />}
    </>
  );
}
