"use client";

import { createContext, useContext, useState } from "react";

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <NavContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
