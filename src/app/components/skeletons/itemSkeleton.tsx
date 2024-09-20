import { FC } from "react";

const ItemSkeleton: FC = () => {
  return (
    <li className="grid-rows-5 bg-zinc-900 rounded overflow-hidden min-w-56 animate-pulse">
      <div className="row-span-3 aspect-square bg-zinc-600"></div>
      <div className="row-span-2 px-2 py-3 text-xs">
        <div className="w-full mb-3">
          <div className="h-4 bg-zinc-600 w-[90%] rounded"></div>
        </div>
        <div className="h-3 bg-zinc-600 w-24 rounded mb-3"></div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col gap-2 items-center">
            <div className="h-3 bg-zinc-600 w-10 rounded"></div>
            <div className="h-6 w-6 bg-zinc-600 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="h-3 bg-zinc-600 w-10 rounded"></div>
            <div className="h-6 w-6 bg-zinc-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemSkeleton;
