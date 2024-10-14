import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Sidebar.module.scss";
import { Search } from "../Search/Search";
import { Results } from "../Results/Results";

interface SidebarProps extends ComponentPropsWithoutRef<"div"> {}

export const Sidebar = ({
  className,
  children,
  ...props
}: SidebarProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <div className={styles.search}>
        <h4>Поиск сотрудников</h4>
        <Search className={styles.input} />
      </div>
      <div className={styles.result}>
        <h4>Результаты</h4>
        <Results className={styles.resultList} />
      </div>
    </div>
  );
};
