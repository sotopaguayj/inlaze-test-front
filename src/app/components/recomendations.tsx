import { getRecommendations } from "@/actions/movies";
import { useQuery } from "@tanstack/react-query";
import MovieItem from "./movieItem";
import { MovieResponse } from "@/interfaces/movie";

interface RecommendProps {
  movieId: string;
}

function Recommend({ movieId }: RecommendProps) {
  const { data } = useQuery<MovieResponse>({
    queryKey: ["recommendations", movieId],
    queryFn: () => getRecommendations(movieId),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-10 px-10 py-10 lg:px-32">
      <h1 className="text-2xl font-bold">Recommendations</h1>
      <ul className="relative flex items-center w-full gap-10 overflow-auto">
        {data?.results.map((movie) => (
          <div key={movie.id} className="flex">
            <MovieItem movie={movie} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Recommend;
