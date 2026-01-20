"use client";

import { use } from "react";

export default function Checkout({ params }) {
  const { checkout } = use(params);

  return <p>Checkout: {checkout}</p>;
}
