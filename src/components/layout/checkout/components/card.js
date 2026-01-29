export default function Card({ title, description, action, children }) {
  return (
    <div className="bg-(--bg-page) rounded-xl p-6 shadow-(--shadow-sm)">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-(--text-muted) mt-1">{description}</p>
          )}
        </div>
        {action}
      </div>

      {children}
    </div>
  );
}
