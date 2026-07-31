/**
 * Pinta un bloque de datos estructurados. Es un componente de servidor: el
 * JSON-LD viaja en el HTML, sin depender de que el buscador ejecute JS.
 */
export default function JsonLd({ schema }) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
