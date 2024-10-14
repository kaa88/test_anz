import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Results.module.scss";
import { useAppSelector } from "../../app/store";
import { ResultItem } from "../ResultItem/ResultItem";
import { Loader } from "../Loader/Loader";

const EMPTY_INPUT_MESSAGE = "начните поиск";
const EMPTY_RESULT_MESSAGE = "ничего не найдено";

interface ResultsProps extends ComponentPropsWithoutRef<"div"> {}

export const Results = ({ className, ...props }: ResultsProps): JSX.Element => {
  const {
    list: userList,
    isLoading,
    loadError,
    searchValue,
  } = useAppSelector((state) => state.user);

  let message = "";
  if (!userList.length) message = EMPTY_RESULT_MESSAGE;
  if (!userList.length && !searchValue) message = EMPTY_INPUT_MESSAGE;
  if (loadError) message = loadError;

  return (
    <div className={cn([className, styles._])} {...props}>
      {isLoading && <Loader className={styles.loader} />}

      {!isLoading && !!message && (
        <p className={styles.errorMessage}>{message}</p>
      )}

      <div className={styles.scrollContainer}>
        {!message &&
          userList.map((user) => (
            <ResultItem
              key={user.id}
              className={styles.resultItem}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};
