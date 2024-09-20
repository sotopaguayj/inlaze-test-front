"use client"

import { ManageFavorite } from "@/actions/favorite/fav.action";
import { useFavsMovies, useModal, useSession } from "@/store/context";
import { FC } from "react";
import { toast } from "sonner";

interface HeartProps {
  isFavorite?: boolean;
  movieId: string;
}

const HeartFavorite: FC<HeartProps> = ({ isFavorite, movieId }) => {
  const { onOpen } = useModal();
  const { favs, setFavs } = useFavsMovies();
  const { isAuth, token } = useSession();

  const isFav = favs.some((fav) => fav?.movieId === movieId);
  const color = isFav ? "text-rose-500" : "text-white";

  const handleAddFavorite = () => {
    if (!isAuth) return onOpen();
    toast.dismiss();
    toast.promise(ManageFavorite(movieId, token), {
      loading: "Cargando...",
      success: (res) => {
        if (res.data) {
          setFavs([...favs, res.data]);
        } else {
          setFavs(favs.filter((fav) => fav?.movieId !== movieId));
        }
        return res.message;
      },
      error: (err: any) => {
        console.log(err);
        return "Error";
      },
    });
  };

  return (
    <span
      onClick={handleAddFavorite}
      className={`${color} text-2xl size-8 icon-[ion--heart] cursor-pointer active:scale-95 transition-transform`}
      role="img"
      aria-hidden="true"
    />
  );
};

export default HeartFavorite;
