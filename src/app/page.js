import Header from "./components/header";
import Hero from "./components/hero";
import ProductCatalog from "./components/productCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
      </main>
    </>
  );
}
