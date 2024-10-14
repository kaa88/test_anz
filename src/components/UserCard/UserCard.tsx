import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./UserCard.module.scss";
import { User } from "../../features/users/types";
import image from "../../assets/image.png";
import { useAppSelector } from "../../app/store";
import { api } from "../../features/users/api";
import { Loader } from "../Loader/Loader";

interface UserCardProps extends ComponentPropsWithoutRef<"div"> {
  data: User;
}

export const UserCard = ({
  className,
  data,
  ...props
}: UserCardProps): JSX.Element => {
  const userId = useAppSelector((state) => state.user.selectedUserId);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [about, setAbout] = useState("");

  const fetch = () => {
    setIsLoading(true);
    setError("");
    api
      .getUserAbout({ userId })
      .then((res) => setAbout(res.data[0].body))
      .catch((err) => {
        setAbout("");
        setError("Ошибка при загрузке данных");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetch();
  }, [userId]); // eslint-disable-line

  return (
    <div className={cn([className, styles._])} {...props}>
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{data.name}</p>

        <p className={styles.contact}>
          <span className={styles.contactTitle}>email:</span>
          <span className={styles.contactText}>{data.email}</span>
        </p>
        <p className={styles.contact}>
          <span className={styles.contactTitle}>phone:</span>
          <span className={styles.contactText}>{data.phone}</span>
        </p>

        <p className={styles.aboutTitle}>О себе:</p>
        <div className={styles.aboutWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <p className={styles.aboutText}>{error || about}</p>
          )}
        </div>
      </div>
    </div>
  );
};
