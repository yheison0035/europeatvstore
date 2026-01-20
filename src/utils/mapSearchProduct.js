export function mapSearchProduct(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.price + 30000, // QUEMADO
    stock: product.stock,
    sku: product.sku,
    color: product.color,
    image: "/logo.png", // QUEMADO
    description: `Color: ${product.color}`, // QUEMADO
  };
}
