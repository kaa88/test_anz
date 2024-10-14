import {
  ComponentPropsWithoutRef,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import cn from "classnames";
import styles from "./Search.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getUserList, setSearchValue } from "../../features/users/store";
import { debounce } from "../../utils/debounce";

interface SearchProps extends ComponentPropsWithoutRef<"input"> {}

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.user.searchValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.currentTarget.value));
  };

  const search = () => dispatch(getUserList());
  const debouncedSearch = useCallback(debounce(search, 1000), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    debouncedSearch();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      className={cn([className, styles._])}
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Введите Id или имя"
      {...props}
    />
  );
};
