import Link from "next/link";

export default function Breadcrumbs({ category }) {
  return (
    <nav className="text-sm text-(--text-muted) mb-6">
      <Link href="/" className="hover:text-(--brand-accent)">
        Inicio
      </Link>
      <span className="mx-2">/</span>
      <span className="text-(--text-primary) font-medium capitalize">
        {category.replace("-", " ")}
      </span>
    </nav>
  );
}
