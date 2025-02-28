import type { RefObject } from "react";
import cx from "classnames";

import { IconSearch } from "@/shared/ui/Icon/ui/IconSearch";

import styles from "./SearchBar.module.css";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  className?: string;
}

export const SearchBar = ({ value, onChange, inputRef, className }: IProps) => {
  return (
    <div className={cx(styles.container, className)}>
      <IconSearch className={styles.icon} />

      <input
        type="text"
        ref={inputRef}
        placeholder="What test are you looking for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchBar}
      />
    </div>
  );
};
