import { FC } from "react";
import Button from "./ui/button";
import { useFavsMovies, useModal, useSession } from "@/store/context";
import { toast } from "sonner";
import { singOut } from "@/actions/auth/sing";

interface LogOutProps {
  key?: string;
}

const LogOut: FC<LogOutProps> = ({ key }) => {
  const { onClose, isOpen } = useModal();
  const { logout, token } = useSession();
  const { setFavs } = useFavsMovies();

  const handleSingout = () => {
    toast.dismiss();
    toast.promise(singOut(token), {
      loading: "Cerrando sesión...",
      success: () => {
        onClose();
        logout();
        setFavs([]);
        localStorage.removeItem("token");
        return "Sesión cerrada correctamente";
      },
      error: "Error al cerrar sesión",
    });
  };

  const modalClass = isOpen ? "scale-100" : "scale-0";
  return (
    <div
      className={`absolute px-5 py-2 translate-x-1/2 transition-transform top-[54px] rounded-b right-1/2 bg-zinc-950 ${modalClass}`}
    >
      <Button onClick={handleSingout} customType="outline">
        <span>Salir</span>
      </Button>
    </div>
  );
};

export default LogOut;
