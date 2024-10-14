import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Loader.module.scss";
import { CgSpinner } from "react-icons/cg";

interface LoaderProps extends ComponentPropsWithoutRef<"div"> {}

export const Loader = ({ className, ...props }: LoaderProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <div className={styles.wrapper}>
        <CgSpinner />
      </div>
    </div>
  );
};
