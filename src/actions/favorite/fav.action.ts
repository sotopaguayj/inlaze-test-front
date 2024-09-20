import axios from "axios";
import { ServerAPI } from "..";

export const ManageFavorite = async (
  movieId: string,
  token: string
): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/favourites`,
      { movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavourites = async (token: string): Promise<any> => {
  try {
    const data = await ServerAPI.get("/favourites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
