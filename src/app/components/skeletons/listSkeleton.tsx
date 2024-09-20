"use client"

import ItemSkeleton from "./itemSkeleton";

function ListSkeleton() {
  return (
    <div className="p-5 mt-10 lg:mt-0 animate-pulse">
      <div className="w-32 h-6 mb-5 rounded bg-zinc-700"></div>
      <ul className="flex items-center w-full gap-10 pb-1 overflow-auto">
        {Array.from({ length: 5 }).map((_, idx) => (
          <ItemSkeleton key={idx} />
        ))}
      </ul>
    </div>
  );
}

export default ListSkeleton;
