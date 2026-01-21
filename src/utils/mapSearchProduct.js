export function mapSearchProduct(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice,
    discount: product.discount,
    stock: product.stock,
    colors: product.colors,
    image: product.image,
    description: product.description,
  };
}
