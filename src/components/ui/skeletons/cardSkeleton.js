"use client";

export default function CardSkeleton({
  image = true,
  lines = 2,
  compact = false,
}) {
  return (
    <div
      className={`
        rounded-xl
        bg-white
        shadow
        animate-pulse
        ${compact ? "p-4" : "p-6"}
      `}
    >
      <div className="flex flex-col items-center gap-4">
        {image && (
          <div
            className={`
              rounded-xl bg-gray-200
              ${compact ? "w-12 h-12" : "w-20 h-20"}
            `}
          />
        )}

        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`
              h-3 bg-gray-200 rounded
              ${i === 0 ? "w-24" : "w-16"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
