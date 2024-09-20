"use client";
import { Movie } from "@/interfaces/movie";
import { FC } from "react";
import CircleRate from "./ui/circleRate";
import HeartFavorite from "./ui/heartFavorite";
import { useRouter } from "next/navigation";

interface ItemProps {
  movie: Movie;
}

const movieItem: FC<ItemProps> = ({ movie }) => {
  const router = useRouter();
  const imgPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "noimg.jpg";
  return (
    <li className="grid-rows-5 w-[200px] overflow-hidden rounded bg-zinc-900 max-w-56">
      <div className="row-span-3 aspect-square h-[223px] w-[200px] shadow-[0_1px_10px_2px_rgba(0,0,0,0.8)]">
        <picture>
          <img
            width={200}
            height={223}
            className="h-[223px] w-[200px]"
            loading="lazy"
            src={imgPath}
            alt={movie.original_title}
          />
        </picture>
      </div>
      <div className="row-span-2 px-2 py-3 text-xs">
        <div className="w-full">
          <h1
            onClick={() => router.push(`/mov/${movie.id}`)}
            title={movie.title}
            className="text-sm hover:text-rose-500 transition-colors cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap font-semibold mb-3 w-[90%]"
          >
            {movie.title}
          </h1>
        </div>
        <span> {new Date(movie.release_date).toDateString()}</span>
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <small>Rating</small>
            <CircleRate size="sm" rate={movie.vote_average} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <small>Favorite</small>
            <HeartFavorite movieId={movie.id.toString()} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default movieItem;
