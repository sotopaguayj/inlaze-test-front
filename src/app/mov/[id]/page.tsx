"use client";
import { FC } from "react";
import RootLayout from "@/app/layout";
import { getMovie } from "@/actions/movies";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import { MovieByID } from "@/interfaces/movie";
import Button from "@/app/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import CircleRate from "@/app/components/ui/circleRate";
import Recommend from "@/app/components/recomendations";
import HeartFavorite from "@/app/components/ui/heartFavorite";
import MovieSkeleton from "@/app/components/skeletons/movieSkeleton";

export default function MovieDetail(): JSX.Element {
  const param = useParams();
  const id = param.id as string;
  const router = useRouter();

  const { data, isFetching, error, isError } = useQuery<MovieByID>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    refetchOnWindowFocus: false,
  });

  const poster = data?.poster_path
    ? `https://image.tmdb.org/t/p/original${data?.poster_path}`
    : "noimg.jpg";
  const backdrop = data?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data?.backdrop_path}`
    : "noimg.jpg";
  return (
    <RootLayout>
      <Header />
      {isFetching && !data && <MovieSkeleton />}
      {isError && <div>Error: {error?.message}</div>}
      {data && !isFetching && (
        <div>
          <div className="lg:max-h-[560px] w-full flex flex-col relative pb-10">
            <div className="grid self-start m-1 text-3xl size-10 place-content-center">
              <Button
                onClick={() => router.push("/", { scroll: true })}
                customType="ghost"
              >
                <span
                  className="icon-[material-symbols--chevron-left] text-2xl"
                  role="img"
                  aria-hidden="true"
                />
              </Button>
            </div>
            <div className="flex flex-col items-center h-full gap-10 px-10 lg:gap-1 lg:items-start lg:grid lg:grid-cols-7 lg:px-20">
              <div className="flex max-w-[305px] mx-auto flex-col items-center w-full h-full col-span-2 gap-5 ">
                <img
                  loading="lazy"
                  src={poster}
                  alt={data.id.toString()}
                  className="max-h-[395px] w-full shadow-xl"
                />
                <Button>
                  <span>Oficial Trailer</span>
                  <span
                    className="icon-[hugeicons--play]"
                    role="img"
                    aria-hidden="true"
                  />
                </Button>
              </div>
              <div className="flex flex-col justify-between h-full col-span-5 gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold">{data.title}</h1>
                  <small className="text-sm">
                    {new Date(data.release_date).toDateString()}
                  </small>
                </div>
                <div className="flex flex-col gap-10">
                  <h2 className="text-2xl ">Overview</h2>
                  <p className="">{data.overview} </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <CircleRate size="xl" rate={data.vote_average} />
                    <p>
                      <span className="block">Score</span>
                      <span>Users</span>
                    </p>
                  </div>
                  <HeartFavorite movieId={data.id.toString()} />
                </div>
                <div>
                  <ul className="flex flex-wrap justify-center gap-5">
                    {data.genres.map((g) => (
                      <i
                        className="px-4 py-2 text-xs font-semibold bg-transparent border rounded border-rose-500 text-rose-500"
                        key={g.id}
                      >
                        {g.name}
                      </i>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-black/50 -z-10" />
            <div className="absolute inset-0 grid overflow-hidden -z-20 ">
              <img
                className="object-contain aspect-video [mask-image:linear-gradient(#3f3f46_80%,transparent)]"
                height={560}
                src={backdrop}
                alt={data.title}
              />
            </div>
          </div>
          <Recommend movieId={id} />
        </div>
      )}
    </RootLayout>
  );
}
