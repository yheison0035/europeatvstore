export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          <img src="./logo.png" alt="logo" width={50} height={50} />
        </h1>
        <nav className="space-x-4 hidden md:flex">
          <a
            href="#producto"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Producto
          </a>
          <a
            href="#beneficios"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Beneficios
          </a>
          <a
            href="#contacto"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Contacto
          </a>
        </nav>
        <a
          href="https://wa.me/573147337602"
          className="md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </header>
  );
}
