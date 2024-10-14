import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Logo.module.scss";

interface LogoProps extends ComponentPropsWithoutRef<"div"> {}

export const Logo = ({ className, ...props }: LogoProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <a href="/">Жилфонд</a>
    </div>
  );
};
