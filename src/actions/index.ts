import axios from "axios";

export const MovieAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export const ServerAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
