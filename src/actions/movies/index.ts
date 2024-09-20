"use server";
import { MovieDType, MovieResponse, MovieType } from "@/interfaces/movie";
import { MovieAPI } from "..";

export interface QParam {
  genre: number;
  movieType: MovieType;
  pageParam: number | unknown;
  keyWord?: string;
}

export const getMovie = async (id: string): Promise<any> => {
  try {
    const response = await MovieAPI.get("/movie/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovies = async ({
  genre,
  movieType,
  pageParam,
  keyWord,
}: QParam): Promise<MovieResponse> => {
  try {
    if (keyWord) {
      // https://api.themoviedb.org/3/search/movie
      const response = await MovieAPI.get("/search/movie?include_adult=false", {
        params: {
          query: keyWord,
          page: pageParam,
        },
      });
      return response.data;
    } else if (genre) {
      // https://api.themoviedb.org/3/discover/movie
      const response = await MovieAPI.get(
        "/discover/movie?include_adult=false",
        {
          params: {
            sort_by: movieType,
            with_genres: genre,
            page: pageParam,
            query: keyWord,
          },
        }
      );
      return response.data;
    } else {
      // https://api.themoviedb.org/3/movie/[movie_type]
      const response = await MovieAPI.get("/movie/" + MovieDType[movieType], {
        params: {
          query: keyWord,
          page: pageParam,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecommendations = async (id: string): Promise<any> => {
  try {
    // https://api.themoviedb.org/3/movie/917496/recommendations
    const response = await MovieAPI.get(
      `/movie/${id}/recommendations?include_adult=false`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBanner = async (): Promise<MovieResponse> => {
  try {
    // https://api.themoviedb.org/3/discover/movie?include_adult=true&page=1&sort_by=popularity.desc
    const response = await MovieAPI.get(
      "/discover/movie?include_adult=true&sort_by=popularity.desc"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
