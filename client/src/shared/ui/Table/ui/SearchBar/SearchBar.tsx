import cx from "classnames";

import { IconSearch } from "@/shared/ui/Icon/ui/IconSearch";

import styles from "./SearchBar.module.css";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar = ({ value, onChange, className }: IProps) => {
  return (
    <div className={cx(styles.container, className)}>
      <IconSearch className={styles.icon} />

      <input
        type="text"
        placeholder="What test are you looking for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchBar}
      />
    </div>
  );
};
