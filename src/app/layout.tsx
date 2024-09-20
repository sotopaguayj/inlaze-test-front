"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useFavsMovies, useSession } from "@/store/context";
import { getFavourites } from "@/actions/favorite/fav.action";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const { login, token } = useSession();
  const { setFavs, favs } = useFavsMovies();

  const getFavs = async (tkn) => {
    const x = await getFavourites(tkn);
    setFavs(x.data.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
      getFavs(token);
    }
  }, [ token]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster expand={true} position="top-right" theme="dark" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
