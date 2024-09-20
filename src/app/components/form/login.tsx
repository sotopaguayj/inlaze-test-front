"use client";
import Input from "../ui/input";
import Button from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import { SingInDto, SingInDtoSchema } from "./dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAction } from "@/actions/auth/sing";
import { toast } from "sonner";
import { useModal, useSession } from "@/store/context";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SingInDto>({
    resolver: zodResolver(SingInDtoSchema),
    mode: "onChange",
  });

  const { onClose } = useModal();
  const { login } = useSession();
  const handleLogin: SubmitHandler<SingInDto> = async (data) => {
    toast.dismiss();
    toast.promise(LoginAction(data), {
      loading: "Cargando...",
      success: ({ access_token, message }) => {
        localStorage.setItem("token", access_token);
        onClose();
        reset();
        login(access_token);
        return message;
      },
      error: (err) => {
        return err.response.data.message;
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="relative flex flex-col w-full gap-5"
    >
      <span className="text-sm text-center">We love having you back</span>
      <Input placeholder="Email" type="text" {...register("email")} />
      <Input placeholder="Password" type="password" {...register("password")} />
      <Button type="submit">
        <span>Continue</span>
        <span className="icon-[ph--ticket]" role="img" aria-hidden="true" />
      </Button>
      {Object.values(errors).length > 0 && (
        <small className="absolute z-50 w-full px-3 py-1 border-l-2 bg-rose-500/20 border-rose-500 -bottom-10">
          {Object.values(errors)[0].message}
        </small>
      )}
    </form>
  );
};

export default Login;
