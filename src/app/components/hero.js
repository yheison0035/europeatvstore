export default function Hero() {
  return (
    <section className="bg-red-50 py-10 md:py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          AQUI VAN BANNERS DE PUBLICIDAD
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Compra ahora el producto más útil y necesario del mercado. Entregas en
          todo Colombia.
        </p>
        <a
          href="https://wa.me/573147337602"
          className="mt-6 inline-block bg-green-500 text-white text-lg px-6 py-3 rounded-xl font-medium hover:bg-green-600"
        >
          Comprar ahora por WhatsApp
        </a>
      </div>
    </section>
  );
}
