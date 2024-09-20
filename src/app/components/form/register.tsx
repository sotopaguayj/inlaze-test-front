import { FC } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SingUpDto, SingUpDtoSchema } from "./dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RegisterAction } from "@/actions/auth/sing";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SingUpDto>({
    resolver: zodResolver(SingUpDtoSchema),
  });

  const handleRegister: SubmitHandler<SingUpDto> = (data: SingUpDto) => {
    toast.dismiss();
    toast.promise(RegisterAction(data), {
      loading: "Registrando...",
      success: (res) => {
        reset();
        return res.message;
      },
      error: (err) => {
        return err.response.data.message;
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="relative flex flex-col w-full gap-5"
      action=""
    >
      <Input {...register("name")} placeholder="Name" type="text" />
      {/* {errors.name && <small>{errors.name.message}</small>} */}
      <Input {...register("userName")} placeholder="Username" type="text" />
      {/* {errors.userName && <small>{errors.userName.message}</small>} */}
      <Input {...register("email")} placeholder="Email" type="text" />
      {/* {errors.email && <small>{errors.email.message}</small>} */}
      <Input {...register("password")} placeholder="Password" type="password" />
      {/* {errors.password && <small>{errors.password.message}</small>} */}

      <Button>
        <span>Register white you email</span>
        <span className="icon-[mage--email]" role="img" aria-hidden="true" />
      </Button>
      {Object.values(errors).length > 0 && (
        <small className="absolute z-50 w-full px-3 py-1 border-l-2 bg-rose-500/20 border-rose-500 -bottom-10">
          {Object.values(errors)[0].message}
        </small>
      )}
    </form>
  );
};

export default Register;
