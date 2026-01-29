"use client";

export default function FiltersSidebarSkeleton() {
  return (
    <aside
      className="
        bg-(--bg-page)
        p-5
        rounded-xl
        border border-(--border-soft)
        shadow-sm
        animate-pulse
      "
    >
      <div className="h-4 w-24 bg-gray-200 rounded mb-6" />

      <SkeletonGroup />
      <SkeletonGroup />
      <SkeletonPrice />
    </aside>
  );
}

function SkeletonGroup() {
  return (
    <div className="mb-6 space-y-3">
      <div className="h-3 w-16 bg-gray-200 rounded" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function SkeletonPrice() {
  return (
    <div className="mb-2 space-y-3">
      <div className="h-3 w-16 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="h-8 w-full bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
