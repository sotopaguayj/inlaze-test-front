import { MoviesGenres } from "@/interfaces/movie";
import { useFilters } from "@/store/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import Button from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

const FilterBar: FC = () => {
  const { genre, changeGenre, keyWord, setKeyWord } = useFilters();
  const [isVisibe, setIsVisible] = useState(false);

  type InputSearch = {
    keyword: string;
  };

  const { handleSubmit, register, reset } = useForm<InputSearch>();
  const qc = useQueryClient();

  const mutationGenre = useMutation({
    mutationFn: async (id: number) => changeGenre(id),
  });

  const handleGenre = (id: number) => {
    setKeyWord("");
    mutationGenre.mutate(id, {
      onSuccess: () => qc.invalidateQueries({ queryKey: [genre] }),
    });
  };

  const mutationKeyWord = useMutation({
    mutationFn: async (k: string) => setKeyWord(k),
  });

  const handleSearch: SubmitHandler<InputSearch> = (data) => {
    changeGenre(0);
    mutationKeyWord.mutate(data.keyword, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [keyWord] });
      },
    });
  };

  const handleVisible = () => setIsVisible(!isVisibe);

  const menuClass = isVisibe
    ? "translate-x-0"
    : "-translate-x-80 lg:translate-x-0";
  const btnClass = isVisibe ? "right-3" : "-right-10 lg:hidden";

  return (
    <div
      className={`p-5 lg:sticky h-dvh w-80 fixed  flex flex-col items-start transition-transform gap-5 z-10 top-0 bg-zinc-800 ${menuClass}`}
    >
      <div className={`absolute ${btnClass}`}>
        <Button customType="solid" onClick={handleVisible}>
          <span
            className="icon-[pepicons-pop--menu] "
            role="img"
            aria-hidden="true"
          />
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleSearch)} className="flex flex-col">
        <span className="mb-5 font-semibold">Search</span>
        <label className="relative" htmlFor="keyword">
          <button className="absolute grid transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-zinc-950 size-8 place-content-center">
            <span
              className="icon-[ph--magnifying-glass-duotone] "
              role="img"
              aria-hidden="true"
            />
          </button>
          <input
            id="keyword"
            className="px-3 py-4 pr-12 border-b rounded-t outline-none bg-zinc-900"
            type="text"
            placeholder="Keywords"
            {...register("keyword")}
          />
        </label>
      </form>
      <div className="flex flex-col w-full">
        <span className="mb-5 font-semibold">Genres</span>
        <ul className="flex flex-col items-start p-2 overflow-y-auto bg-zinc-900 max-h-80">
          {MoviesGenres.map((g) => (
            <li key={g.id} className="w-full">
              <label
                className="flex hover:bg-rose-600 cursor-pointer transition-colors w-full px-2 has-[:checked]:bg-rose-700"
                htmlFor={g.name}
              >
                {g.name}
                <input
                  onChange={() => handleGenre(g.id)}
                  checked={genre === g.id}
                  id={g.name}
                  name="genre"
                  className="hidden"
                  type="radio"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterBar;
