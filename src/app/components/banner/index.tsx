"use client";
import { getBanner } from "@/actions/movies";
import { MovieResponse } from "@/interfaces/movie";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import BannerItem from "./item";

const Banner: FC = () => {
  // const [slide, setSlide] = useState(0);
  const { data, isFetching } = useQuery<MovieResponse>({
    queryKey: ["banner"],
    queryFn: () => getBanner(),
    refetchOnWindowFocus: false,
  });

  // const handleRight = () => slide < 100 && setSlide(slide + 10);
  // const handleLeft = () => slide >= 10 && setSlide(slide - 10);

  if (isFetching) return <div>Loading...</div>;
  return (
    <div className="w-full relative h-[436px] lg:h-custom overflow-hidden">
      {isFetching && <div>Loading...</div>}
      {data && <BannerItem movie={data.results[0]} />}
      {/* Proximamente un slider
      <ul className="h-[436px] w-full flex items-center overflow-auto">
        {data?.results.map((mov) => <BannerItem key={mov.id} item={mov} />)}
      </ul>
      <div className="absolute inset-0 flex items-center justify-between px-10">
        <span
          onClick={handleLeft}
          className="icon-[mdi--arrow-expand-left]"
          role="img"
          aria-hidden="true"
        />
        <span
          onClick={handleRight}
          className="icon-[mdi--arrow-expand-right]"
          role="img"
          aria-hidden="true"
        />
      </div> */}
    </div>
  );
};

export default Banner;
