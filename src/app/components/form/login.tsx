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
      className="flex flex-col w-full gap-5"
    >
      <span className="text-sm text-center">We love having you back</span>
      <Input placeholder="Email" type="text" {...register("email")} />
      {errors.email && (
        <small className="text-red-500">{errors.email.message}</small>
      )}
      <Input placeholder="Password" type="password" {...register("password")} />
      {errors.password && (
        <small className="text-red-500">{errors.password.message}</small>
      )}
      <Button type="submit">
        <span>Continue</span>
        <span className="icon-[ph--ticket]" role="img" aria-hidden="true" />
      </Button>
    </form>
  );
};

export default Login;
