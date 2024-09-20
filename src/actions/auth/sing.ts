import { SingInDto } from "@/app/components/form/dto";
import { ServerAPI } from "..";

export const LoginAction = async (formData: SingInDto): Promise<any> => {
  const { data } = await ServerAPI.post("/auth/singin", formData);
  return data;
};

export const RegisterAction = async (formData: SingInDto): Promise<any> => {
  const { data } = await ServerAPI.post("/auth/singup", formData);
  return data;
};

export const singOut = async (token: string): Promise<any> => {
  ServerAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { data } = await ServerAPI.post("/auth/singout");
  return data;
};
