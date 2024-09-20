import { Favs } from "@/interfaces/movie";
import { create } from "zustand";

type Filters = {
  genre: number;
  keyWord: string;
  changeGenre: (g: number) => void;
  setKeyWord: (k: string) => void;
};

export const useFilters = create<Filters>((set) => ({
  genre: 0,
  keyWord: "",
  changeGenre: (g) => set(() => ({ genre: g })),
  setKeyWord: (k) => set(() => ({ keyWord: k })),
}));

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useModal = create<Modal>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));

type Session = {
  isAuth: boolean;
  token: string;
  login: (t: string) => void;
  logout: () => void;
};

export const useSession = create<Session>((set) => ({
  isAuth: false,
  token: "",
  login: (t) => set(() => ({ isAuth: true, token: t })),
  logout: () => set(() => ({ isAuth: false, token: "" })),
}));

type FavMovie = {
  favs: Favs[];
  setFavs: (f: Favs[]) => void;
};

export const useFavsMovies = create<FavMovie>((set) => ({
  favs: [],
  setFavs: (f) => set(() => ({ favs: f })),
}));
