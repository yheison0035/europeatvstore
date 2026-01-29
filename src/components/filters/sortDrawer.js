"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Drawer from "./drawer";
import Portal from "../ui/portal";

export default function SortDrawer({ open, onClose, sorts = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("sort");

  function apply(value) {
    const params = new URLSearchParams(searchParams);
    value ? params.set("sort", value) : params.delete("sort");
    router.push(`?${params.toString()}`);
    onClose();
  }

  if (!sorts.length) return null;

  return (
    <Portal>
      <Drawer open={open} onClose={onClose} title="Ordenar por">
        <div className="space-y-3">
          {sorts.map((s) => (
            <button
              key={s.value}
              onClick={() => apply(s.value)}
              className={`
                w-full text-left px-4 py-3 rounded-lg border cursor-pointer
                ${
                  active === s.value
                    ? "bg-(--brand-primary) text-white border-(--brand-primary)"
                    : "border-(--border-soft)"
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </div>
      </Drawer>
    </Portal>
  );
}
