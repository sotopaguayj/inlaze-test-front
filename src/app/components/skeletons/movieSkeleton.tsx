import { FC } from "react";

interface MovieSkeletonProps {
  key?: string;
}

const MovieSkeleton: FC<MovieSkeletonProps> = ({ key }) => {
  return (
    <div>
      <div className="relative">
        <div className="max-h-[560px] w-full grid place-content-center overflow-hidden bg-gray-300 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20" />
      </div>
      <div className="max-h-[560px] w-full absolute top-[69px] flex flex-col">
        <div className="grid self-start w-10 h-10 m-1 text-3xl bg-gray-300 rounded-full size-10 place-content-center animate-pulse" />
        <div className="flex flex-col items-center h-full gap-10 px-10 lg:gap-1 lg:items-start lg:grid lg:grid-cols-7 lg:px-20">
          <div className="flex max-w-[305px] mx-auto flex-col items-center w-full h-full col-span-2 gap-5 ">
            <div className="max-h-[395px] w-full shadow-xl bg-gray-300 animate-pulse" />
            <div className="w-24 h-10 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="flex flex-col justify-between h-full col-span-5 gap-5 pb-10">
            <div className="flex flex-col gap-2">
              <div className="w-3/4 h-8 bg-gray-300 animate-pulse" />
              <div className="w-1/4 h-4 bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col gap-10">
              <div className="w-1/3 h-6 bg-gray-300 animate-pulse" />
              <div className="w-full h-4 bg-gray-300 animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-16 h-6 bg-gray-300 animate-pulse" />
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
            </div>
            <div>
              <ul className="flex flex-wrap justify-center gap-5">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={index}
                      className="w-16 h-8 px-4 py-2 text-xs font-semibold bg-gray-300 rounded animate-pulse"
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
