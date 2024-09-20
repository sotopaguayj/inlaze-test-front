"use client";
import { MovieType } from "@/interfaces/movie";
import MovieList from "./components/movieList";
import RootLayout from "./layout";
import FilterBar from "./components/filterBar";
import Header from "./components/header";
import Banner from "./components/banner/index";

export default function Home(): JSX.Element {
  return (
    <RootLayout>
      <Header />
      <Banner />
      <div className="flex">
        <FilterBar />
        <div className="flex flex-col overflow-hidden">
          <MovieList type={MovieType.POPULAR} />
          <MovieList type={MovieType.NOW_PLAYING} />
          <MovieList type={MovieType.UPCOMING} />
          <MovieList type={MovieType.TOP_RATED} />
        </div>
      </div>
    </RootLayout>
  );
}
