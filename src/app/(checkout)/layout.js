import HeaderCheckout from "@/components/layout/header/headerChekout";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <HeaderCheckout />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
