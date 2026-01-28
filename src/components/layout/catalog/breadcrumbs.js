import { unslugify } from "@/utils/unslugify";
import Link from "next/link";

export default function Breadcrumbs({ category, product }) {
  return (
    <nav className="text-sm text-(--text-muted) flex gap-2">
      <Link href="/">Inicio</Link>
      <span>/</span>

      <Link href={`/${category}`} className="capitalize">
        {unslugify(category)}
      </Link>

      {product && (
        <>
          <span>/</span>
          <span className="text-(--text-primary) font-medium">
            {unslugify(product)}
          </span>
        </>
      )}
    </nav>
  );
}
