import { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="p-2 border-b rounded-t text-zinc-900 focus:outline-rose-500"
      {...props}
    />
  );
});


export default Input;
