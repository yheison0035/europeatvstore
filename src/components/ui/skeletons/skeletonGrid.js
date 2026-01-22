"use client";

import CardSkeleton from "./cardSkeleton";

export default function SkeletonGrid({
  count = 6,
  cols = "grid-cols-2 sm:grid-cols-3",
  compact = false,
}) {
  return (
    <div className={`grid gap-4 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} compact={compact} image lines={2} />
      ))}
    </div>
  );
}
