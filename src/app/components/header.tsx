"use client"

import Link from "next/link";
import Form from "./form";
import { useModal, useSession } from "@/store/context";
import LogOut from "./logOut";

function Header() {
  const { onClose, isOpen, onOpen } = useModal();
  const { isAuth } = useSession();

  const handleMenu = () => {
    isOpen ? onClose() : onOpen();
  };

  return (
    <header className="flex items-center justify-between h-[69px]  px-10 bg-zinc-950 lg:px-20">
      <div className="md:hidden"></div>
      <div className="flex flex-col items-center justify-center pb-2 md:flex-row lg:gap-10 md:pb-0">
        <picture>
          <img
            className="w-40"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2bd9e441464385.57a76fdc63013.png"
            alt="popcorn logo"
          />
        </picture>
        <nav className="flex items-center gap-5">
          <Link className="transition-colors hover:text-rose-500" href="/">
            Popular
          </Link>
          <Link className="transition-colors hover:text-rose-500" href="/favs">
            Favorites
          </Link>
        </nav>
      </div>
      <div className="relative z-40">
        <button
          onClick={handleMenu}
          className={`grid transition-colors hover:bg-rose-500/20 border border-transparent rounded-full size-10 place-content-center ${isAuth && "border-rose-600"}`}
        >
          <span
            className={`icon-[hugeicons--user] text-xl ${isAuth && "bg-rose-500"}`}
            role="img"
            aria-hidden="true"
          />
        </button>
        {isAuth && <LogOut />}
      </div>
      {!isAuth && <Form />}
    </header>
  );
}

export default Header;
