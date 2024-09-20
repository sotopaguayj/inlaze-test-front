"use client";

import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customType?: "ghost" | "outline" | "solid";
  extraClass?: string;
}

const Button: FC<ButtonProps> = ({ customType, extraClass, ...props }) => {
  const buttonclasses = {
    ghost: "bg-transparent hover:bg-white/20 border-white active:bg-white/30",
    outline:
      "bg-transparent border-rose-500 active:bg-rose-900/30 text-rose-500",
    solid: "bg-rose-500  active:bg-rose-600 text-zinc-900",
  };
  const buttonClass = buttonclasses[customType || "solid"];
  return (
    <button
      {...props}
      className={`w-full rounded flex items-center gap-1 justify-center active:scale-95 transition-all border font-semibold text-sm p-2 ${buttonClass} ${extraClass}`}
    ></button>
  );
};

export default Button;
