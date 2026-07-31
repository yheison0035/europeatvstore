export async function openWompiCheckout({
  amount,
  currency = "COP",
  reference,
  customerEmail,
}) {
  const amountInCents = Math.round(Number(amount) * 100);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wompi/signature`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        amountInCents,
        currency,
      }),
    },
  );

  const { signature } = await res.json();

  const url =
    `https://checkout.wompi.co/p/?` +
    `public-key=${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}` +
    `&currency=${currency}` +
    `&amount-in-cents=${amountInCents}` +
    `&reference=${reference}` +
    `&signature:integrity=${signature}` +
    // Cada tienda vuelve a SU dominio; la env solo sirve para forzarlo.
    `&redirect-url=${encodeURIComponent(
      process.env.NEXT_PUBLIC_WOMPI_REDIRECT_URL ||
        `${window.location.origin}/checkout/result`,
    )}` +
    `&customer-data:email=${encodeURIComponent(customerEmail)}`;

  window.location.href = url;
}
