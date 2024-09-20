import { FC } from "react";
import Input from "../ui/input";
import Button from "../ui/button";

const Register: FC = () => {
  return (
    <form className="flex flex-col w-full gap-5 " action="">
      <Input placeholder="Name" type="text" name="name" id="name" />
      <Input placeholder="Username" type="text" name="username" id="username" />
      <Input placeholder="Email" type="text" name="email" id="email" />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        id="password"
      />

      <Button>
        <span>Register white you email</span>
        <span className="icon-[mage--email]" role="img" aria-hidden="true" />
      </Button>
    </form>
  );
};

export default Register;
