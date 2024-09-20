"use client"

function ItemSkeleton() {
  return (
    <li className="grid-rows-5 overflow-hidden rounded bg-zinc-900 min-w-56 animate-pulse">
      <div className="row-span-3 aspect-square bg-zinc-600"></div>
      <div className="row-span-2 px-2 py-3 text-xs">
        <div className="w-full mb-3">
          <div className="h-4 bg-zinc-600 w-[90%] rounded"></div>
        </div>
        <div className="w-24 h-3 mb-3 rounded bg-zinc-600"></div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-3 rounded bg-zinc-600"></div>
            <div className="w-6 h-6 rounded-full bg-zinc-600"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-3 rounded bg-zinc-600"></div>
            <div className="w-6 h-6 rounded-full bg-zinc-600"></div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ItemSkeleton;
