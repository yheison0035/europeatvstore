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
import { createOrder } from "@/lib/utils/api/routes/checkout";
import { useToast } from "@/context/toastContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const {
    isSubmitting,
    showConfirm,
    setShowConfirm,
    setIsSubmitting,
    paymentMethod,
    formData,
  } = useCheckout();

  const { items, clearCart } = useCart();
  const toast = useToast();
  const router = useRouter();

  async function handleConfirm() {
    setShowConfirm(false);

    const orderItems = items
      .filter((item) => item.variantId)
      .map((item) => ({
        inventoryVariantId: item.variantId,
        quantity: item.quantity,
      }));

    if (orderItems.length !== items.length) {
      // Pasa con carritos guardados antes de que se guardara la variante.
      toast.error(
        "Tu carrito está desactualizado. Vacíalo y agrega los productos de nuevo.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { billingSameAsShipping } = formData;

      const order = await createOrder({
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          documentNumber: formData.documentNumber || undefined,
          department: formData.department,
          city: formData.city,
          address: formData.address,
          addressDetail: formData.addressDetail || undefined,
          neighborhood: formData.neighborhood || undefined,
          isHardToAccess: Boolean(formData.isHardToAccess),
          billingSameAsShipping: Boolean(billingSameAsShipping),
          ...(billingSameAsShipping
            ? {}
            : {
                billingFirstName: formData.billingFirstName,
                billingLastName: formData.billingLastName,
                billingPhone: formData.billingPhone,
                billingAddress: formData.billingAddress,
              }),
        },
        items: orderItems,
        // Contra entrega se cobra en efectivo; el pago en línea es transferencia
        // y queda EN_VALIDACION hasta que Wompi confirme.
        paymentMethod: paymentMethod === "online" ? "TRANSFERENCIA" : "EFECTIVO",
      });

      if (paymentMethod === "online") {
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        const { cost } = calculateShipping(subtotal);

        // El pedido ya existe: se paga con su código como referencia.
        await openWompiCheckout({
          amount: subtotal + cost,
          reference: order.orderCode,
          customerEmail: formData.email,
        });

        clearCart();
        return;
      }

      clearCart();
      toast.success(`¡Pedido ${order.orderCode} confirmado!`);
      router.push(`/checkout/result?order=${order.orderCode}`);
    } catch (error) {
      toast.error(error.message || "No pudimos crear tu pedido");
    } finally {
      setIsSubmitting(false);
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
