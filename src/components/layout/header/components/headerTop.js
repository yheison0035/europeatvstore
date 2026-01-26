"use client";

import Image from "next/image";
import SearchBar from "./search/searchBar";
import UserIcon from "./userIcon";
import CartIcon from "./cartIcon";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

export default function HeaderTop() {
  const { count } = useCart();

  return (
    <div
      className="
        max-w-7xl mx-auto px-4 py-4
        grid grid-cols-1 gap-4
        md:grid-cols-[auto_1fr_auto]
        md:items-center
      "
    >
      <Link href="/">
        <div className="flex justify-center md:justify-start cursor-pointer">
          <Image
            src="/logo.png"
            alt="EUROPEATVSTORE – Tecnología y Hogar"
            width={70}
            height={70}
            priority
          />
        </div>
      </Link>

      <div className="flex justify-center w-full">
        <SearchBar />
      </div>

      <div className="flex justify-center md:justify-end gap-6 text-(--text-primary)">
        <UserIcon />
        <CartIcon count={count} />
      </div>
    </div>
  );
}
