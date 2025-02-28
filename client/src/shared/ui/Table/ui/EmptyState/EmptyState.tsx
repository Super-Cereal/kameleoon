import type { RefObject } from "react";

import { Button } from "@/shared/ui/Button";

import styles from "./EmptyState.module.css";

interface IProps {
  filterInputRef: RefObject<HTMLInputElement | null>;
  handleFilterChange: (value: string) => void;
}

export const EmptyState = ({ filterInputRef, handleFilterChange }: IProps) => {
  const handleClick = () => {
    handleFilterChange("");
    filterInputRef.current?.focus();
  };

  return (
    <div className={styles.emptyState}>
      <h2 className={styles.title}>Your search did not match any results.</h2>

      <Button view="primary" onClick={handleClick}>
        Reset
      </Button>
    </div>
  );
};
