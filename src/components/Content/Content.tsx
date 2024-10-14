import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Content.module.scss";
import { useAppSelector } from "../../app/store";
import { UserCard } from "../UserCard/UserCard";

interface ContentProps extends ComponentPropsWithoutRef<"div"> {}

export const Content = ({ className, ...props }: ContentProps): JSX.Element => {
  const userId = useAppSelector((state) => state.user.selectedUserId);
  const userData = useAppSelector((state) => state.user.list).find(
    (user) => user.id === userId
  );

  return (
    <div className={cn([className, styles._])} {...props}>
      {userData ? (
        <UserCard data={userData} />
      ) : (
        <div className={styles.emptyBlock}>
          <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
        </div>
      )}
    </div>
  );
};
