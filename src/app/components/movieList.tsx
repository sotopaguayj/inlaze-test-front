"use client";
import { getMovies, QParam } from "@/actions/movies";
import { MovieDName, MovieResponse, MovieType } from "@/interfaces/movie";
import MovieItem from "./movieItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilters } from "@/store/context";
import ListSkeleton from "./skeletons/listSkeleton";
import Button from "./ui/button";

interface ListPros {
  type: MovieType;
}

function MovieList({ type }: ListPros) {
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
    <div className="p-5 mt-10 lg:mt-0">
      <h2 className="mb-5 text-lg font-semibold uppercase">
        {MovieDName[type]}
      </h2>
      <ul className="relative flex items-center w-full gap-10 pb-1 overflow-auto">
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
          className="grid w-20 h-full p-5 text-xl transition-colors rounded cursor-pointer place-content-center hover:bg-white/20"
        >
          {iconBtn}
        </Button>
      </ul>
    </div>
  );
}

export default MovieList;
