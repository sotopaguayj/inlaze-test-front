"use client";
import { getMovies, QParam } from "@/actions/movies";
import {
  Movie,
  MovieDName,
  MovieResponse,
  MovieType,
} from "@/interfaces/movie";
import MovieItem from "./movieItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useFilters } from "@/store/context";
import ListSkeleton from "./skeletons/listSkeleton";
import Button from "./ui/button";

interface ListPros {
  type: MovieType;
}

const MovieList: FC<ListPros> = ({ type }) => {
  const { genre, keyWord } = useFilters();
  const { data, isFetching, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<MovieResponse>({
      queryKey: [type, genre, keyWord],
      queryFn: ({ pageParam }) =>
        getMovies({ genre, movieType: type, pageParam, keyWord }),
      refetchOnWindowFocus: false,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    });

  const handleNext = () => {
    if (hasNextPage) fetchNextPage();
  };
  const iconBtn = isFetching ? (
    <span
      className="icon-[eos-icons--bubble-loading]"
      role="img"
      aria-hidden="true"
    />
  ) : (
    <span
      className="icon-[material-symbols--arrow-forward-ios]"
      role="img"
      aria-hidden="true"
    />
  );

  if (isFetching && !data) return <ListSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5 lg:mt-0 mt-10">
      <h2 className="uppercase text-lg font-semibold mb-5">
        {MovieDName[type]}
      </h2>
      <ul className="flex relative items-center pb-1 gap-10 w-full overflow-auto">
        {data?.pages.flatMap((page) => (
          <div className="flex gap-5" key={page.page}>
            {page.results.map((mov) => (
              <MovieItem movie={mov} key={mov.id} />
            ))}
          </div>
        ))}
        <Button
          disabled={!hasNextPage || isFetching}
          onClick={handleNext}
          className="grid place-content-center hover:bg-white/20 h-full w-20 rounded text-xl p-5 cursor-pointer transition-colors"
        >
          {iconBtn}
        </Button>
      </ul>
    </div>
  );
};

export default MovieList;
