"use client"

import { Movie } from "@/interfaces/movie";
import HeartFavorite from "../ui/heartFavorite";
import CircleRate from "../ui/circleRate";
import { useRouter } from "next/navigation";

interface BannerItemProps {
  movie: Movie;
}

function BannerItem({ movie }: BannerItemProps) {
  const router = useRouter();
  const imgPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "noimg.jpg";

  return (
    <div className="relative flex items-start h-full">
      <img
        className="[mask-image:linear-gradient(#3f3f46_80%,transparent)]"
        src={imgPath}
        alt="asd"
      />
      <div className="absolute inset-0 z-10 flex items-end justify-between px-10 py-5 lg:px-20 lg:py-10">
        <div className="lg:w-[60%] flex flex-col gap-5">
          <h1
            onClick={() => router.push(`/mov/${movie.id}`)}
            className="text-2xl font-bold transition-colors cursor-pointer lg:text-4xl hover:text-rose-500"
          >
            {movie.title}
          </h1>
          <p className="text-sm font-bold">{movie.overview}</p>
        </div>
        <div className="flex items-center gap-10">
          <HeartFavorite movieId={movie.id.toString()} />
          <div>
            <CircleRate size="xl" rate={movie.vote_average} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

export default BannerItem;
