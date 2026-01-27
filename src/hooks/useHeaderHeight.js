"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function useHeaderHeight() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const update = () => {
      setHeight(ref.current.offsetHeight);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { ref, height };
}
