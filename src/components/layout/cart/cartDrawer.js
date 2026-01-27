"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import CartDrawerMobile from "./cartDrawer/cartDrawerMobile";
import CartDrawerDesktop from "./cartDrawer/cartDrawerDesktop";
import Portal from "@/components/ui/portal";

export default function CartDrawer({ open, onClose }) {
  const isMobile = useIsMobile();

  if (!open) return null;

  return (
    <Portal>
      {isMobile ? (
        <CartDrawerMobile open={open} onClose={onClose} />
      ) : (
        <CartDrawerDesktop open={open} onClose={onClose} />
      )}
    </Portal>
  );
}
