import axios from "axios";

export const MovieAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3"}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export const ServerAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
