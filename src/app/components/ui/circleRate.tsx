import { FC } from "react";

interface RateProps {
  rate: number;
  size?: "sm" | "md" | "lg" | "xl";
}

const CircleRate: FC<RateProps> = ({ rate, size }) => {
  const roundedNumber = Math.floor(Math.round(rate * 100) / 10);
  const transform = 88 - (roundedNumber * 88) / 100;
  const customSize =
    size === "sm"
      ? "w-8 h-8"
      : size === "md"
        ? "w-10 h-10"
        : size === "lg"
          ? "w-16 h-16"
          : "w-20 h-20";
  const customSizeText =
    size === "sm"
      ? "text-[10px]"
      : size === "md"
        ? "text-md"
        : size === "lg"
          ? "text-lg"
          : "text-xl";
  const customStrokWidt =
    size === "sm" ? "1" : size === "md" ? "2" : size === "lg" ? "3" : "4";
  const color =
    roundedNumber < 50 ? "rose" : roundedNumber < 70 ? "ambar" : "teal";
  const status = {
    rose: {
      text: "text-rose-500",
      bg: "bg-rose-500",
      bgBase: " bg-rose-800",
    },
    ambar: {
      text: "text-orange-500",
      bg: "bg-orange-500",
      bgBase: " bg-orange-800",
    },
    teal: {
      text: "text-teal-500",
      bg: "text-teal-500",
      bgBase: " text-teal-800",
    },
  };

  return (
    <div className="relative">
      <svg
        className={`${customSize} rounded-full transform -rotate-90`}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={status[color].bgBase}
          strokeWidth={customStrokWidt}
          stroke="currentColor"
          fill="none"
          cx="16"
          cy="16"
          r="14"
        />
        <circle
          className={status[color].text}
          strokeWidth={customStrokWidt}
          stroke="currentColor"
          fill="none"
          cx="16"
          cy="16"
          r="14"
          strokeDasharray="88"
          strokeDashoffset={transform}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center font-bold ${customSizeText}`}
      >
        {roundedNumber}%
      </div>
    </div>
  );
};

export default CircleRate;
