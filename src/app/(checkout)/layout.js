import SimpleHeader from "@/components/layout/checkout/components/simpleHeader";
import CheckoutProviderWrapper from "@/context/checkoutProviderWrapper";

export default function CheckoutLayout({ children }) {
  return (
    <CheckoutProviderWrapper>
      <SimpleHeader />
      <main className="min-h-screen bg-(--bg-soft)">{children}</main>
    </CheckoutProviderWrapper>
  );
}
