import { FC } from "react";
import ItemSkeleton from "./itemSkeleton";

const ListSkeleton: FC = () => {
  return (
    <div className="p-5 lg:mt-0 mt-10 animate-pulse">
      <div className="h-6 w-32 bg-zinc-700 rounded mb-5"></div>
      <ul className="flex items-center pb-1 gap-10 w-full overflow-auto">
        {Array.from({ length: 5 }).map((_, idx) => (
          <ItemSkeleton key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default ListSkeleton;
