import { SingInDto } from "@/app/components/form/dto";
import { ServerAPI } from "..";

export const LoginAction = async (formData: SingInDto): Promise<any> => {
  try {
    const { data } = await ServerAPI.post("/auth/singin", formData);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const RegisterAction = async (formData: SingInDto): Promise<any> => {
  try {
    const { data } = await ServerAPI.post("/auth/singup", formData);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const singOut = async (token: string): Promise<any> => {
  try {
    ServerAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = await ServerAPI.post("/auth/singout");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
