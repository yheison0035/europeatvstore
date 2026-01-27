"use client";

import { createContext, useContext } from "react";

export const LayoutContext = createContext({
  headerHeight: 0,
  headerOffset: 0,
});

export function useLayout() {
  return useContext(LayoutContext);
}
