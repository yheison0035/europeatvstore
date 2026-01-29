import Script from "next/script";
import SimpleHeader from "@/components/layout/checkout/components/simpleHeader";
import CheckoutProviderWrapper from "@/context/checkoutProviderWrapper";

export default function CheckoutLayout({ children }) {
  return (
    <CheckoutProviderWrapper>
      <Script
        src="https://checkout.wompi.co/widget.js"
        strategy="beforeInteractive"
      />
      <SimpleHeader />
      <main className="min-h-screen bg-(--bg-soft)">{children}</main>
    </CheckoutProviderWrapper>
  );
}
