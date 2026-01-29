export function openWompiCheckout({
  amount,
  currency = "COP",
  reference,
  customerEmail,
}) {
  if (!window?.Wompi) return;

  const checkout = new window.Wompi.Checkout({
    publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
    currency,
    amountInCents: Math.round(amount * 100),
    reference,
    redirectUrl: process.env.NEXT_PUBLIC_WOMPI_REDIRECT_URL,
    customerData: {
      email: customerEmail,
    },
  });

  checkout.open();
}
