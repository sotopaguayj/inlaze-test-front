import { FC, useEffect, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Login from "./login";
import Register from "./register";
import { Modaldata } from "./data";
import { useModal } from "@/store/context";

const Form: FC = () => {
  const [option, setOption] = useState<"signin" | "login">("signin");
  const isLogin = option === "login";
  const handleOption = () => {
    setOption(isLogin ? "signin" : "login");
  };
  const data = isLogin ? Modaldata.login : Modaldata.register;
  const { onClose, isOpen } = useModal();

  const modalClass = isOpen ? "scale-100" : "scale-0";

  return (
    <div
      className={`fixed inset-0 lg:inset-auto backdrop-blur-xl z-40 lg:max-w-[1320px] lg:h-[520px] lg:top-[80px] grid grid-rows-5 grid-cols-1 lg:grid-rows-1 lg:grid-cols-5 transition-transform rounded p-2 border border-white/20 ${modalClass}`}
    >
      <div className="flex flex-col justify-between col-span-3 row-span-4 lg:row-span-1">
        <div className="flex flex-col gap-5">
          <div className="self-start p-2">
            <Button customType="ghost" onClick={onClose}>
              <span
                className="icon-[mdi--arrow-left-drop-circle-outline]"
                role="img"
                aria-hidden="true"
              />
              <span>Back</span>
            </Button>
          </div>
          <div
            onClick={handleOption}
            className="relative grid self-center h-10 grid-cols-2 rounded cursor-pointer bg-zinc-900"
          >
            <span
              className={`w-24 grid place-content-center px-3 rounded ${isLogin && "bg-rose-500"}`}
            >
              Sign up
            </span>
            <span
              className={`w-24 grid place-content-center px-3 rounded ${!isLogin && "bg-rose-500"}`}
            >
              Log In
            </span>
          </div>
        </div>
        <div className="w-[90%] md:w-[75%] lg:w-[50%] self-center">
          {!isLogin && <Login />}
          {isLogin && <Register />}
        </div>
        <small className="text-[10px] text-center mb-2">
          For any question, reach out to support@popcornmovies.com
        </small>
      </div>
      <div className="flex flex-col items-center justify-between col-span-2 row-span-1 rounded-r lg:row-span-1 bg-zinc-800">
        <div className="flex flex-col items-center gap-5 p-5 pt-5 text-center">
          <h1 className="text-2xl font-semibold lg:text-4xl lg:font-bold">
            {data.title}
          </h1>
          <p className="lg:w-[90%]">{data.description}</p>
        </div>
        <figure className="max-w-[547px] flex justify-center overflow-hidden">
          <img
            className="hidden lg:block lg:w-[70%]"
            src={data.imageUrl}
            alt="illustration form"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  );
};

export default Form;
