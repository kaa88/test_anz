import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./ResultItem.module.scss";
import { User } from "../../features/users/types";
import image from "../../assets/image.png";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectUser } from "../../features/users/store";

interface ResultItemProps extends ComponentPropsWithoutRef<"button"> {
  user: User;
}

export const ResultItem = ({
  className,
  user,
  ...props
}: ResultItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.user.selectedUserId);
  const active = selectedId === user.id;

  const onClick = () => dispatch(selectUser(user.id));

  return (
    <button
      className={cn([className, styles._, active && styles.active])}
      type="button"
      onClick={onClick}
      {...props}
    >
      <span className={styles.image}>
        <img src={image} alt="" />
      </span>
      <span className={styles.content}>
        <span className={styles.name}>{user.username}</span>
        <span className={styles.email}>{user.email}</span>
      </span>
    </button>
  );
};
