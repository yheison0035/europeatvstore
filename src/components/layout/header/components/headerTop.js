"use client";

import Image from "next/image";
import SearchBar from "./search/searchBar";
import UserIcon from "./userIcon";
import CartIcon from "./cartIcon";
import { useCart } from "@/context/cartContext";

export default function HeaderTop() {
  const { count } = useCart();

  return (
    <div
      className="
        max-w-7xl mx-auto px-4 py-4
        grid grid-cols-1 gap-4
        md:grid-cols-[auto_1fr_auto] md:items-center
      "
    >
      <div className="flex justify-center md:justify-start">
        <Image src="/logo.png" alt="EUROPEATVSTORE" width={70} height={70} />
      </div>

      <div className="flex justify-center w-full">
        <SearchBar />
      </div>

      <div className="flex justify-center md:justify-end gap-6">
        <UserIcon />
        <CartIcon count={count} />
      </div>
    </div>
  );
}
