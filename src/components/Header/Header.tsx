import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { Logo } from "../Logo/Logo";

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {}

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <Logo />
      <h3>Пользователь</h3>
    </div>
  );
};
