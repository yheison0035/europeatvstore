export default function Drawer({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div
        className="
          absolute bottom-0 left-0 right-0
          bg-(--bg-page)
          rounded-t-2xl
          p-5
          max-h-[85vh]
          overflow-y-auto
        "
      >
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-sm text-(--text-muted) cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
