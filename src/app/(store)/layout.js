import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function StoreLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
