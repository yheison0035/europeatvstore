import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function CheckoutLoader() {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-(--bg-page) rounded-xl p-6 flex flex-col items-center gap-3 shadow-(--shadow-lg)">
        <ArrowPathIcon className="w-8 h-8 animate-spin text-(--brand-primary)" />
        <p className="text-sm font-medium">Procesando tu pedido…</p>
      </div>
    </div>
  );
}
