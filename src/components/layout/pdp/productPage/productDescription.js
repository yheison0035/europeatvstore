export default function ProductDescription({ product }) {
  if (
    !product.description &&
    product.features.length === 0 &&
    product.specifications.length === 0
  )
    return null;

  return (
    <section className="mt-14 space-y-8">
      {product.description && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Descripción</h3>
          <p className="text-(--text-secondary)">{product.description}</p>
        </div>
      )}

      {product.features.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Características</h3>
          <ul className="list-disc pl-5 space-y-1">
            {product.features.map((f) => (
              <li key={f.id}>{f.title}</li>
            ))}
          </ul>
        </div>
      )}

      {product.specifications.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Especificaciones</h3>
          <ul className="space-y-2">
            {product.specifications.map((s) => (
              <li key={s.id} className="flex justify-between">
                <span className="text-(--text-muted)">{s.key}</span>
                <span>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
