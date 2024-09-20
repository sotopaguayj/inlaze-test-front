"use client";
import { FC } from "react";
import RootLayout from "../layout";
import Header from "../components/header";

interface FavoriteProps {
  key?: string;
}

const Favorite: FC<FavoriteProps> = ({ key }) => {
  return (
    <RootLayout>
      <Header />
      <div>Component content</div>
    </RootLayout>
  );
};

export default Favorite;
