import cx from "classnames";

import { A11yButton } from "@/shared/ui/A11yButton";
import { IconChevron } from "@/shared/ui/Icon";

import type { IColumn, ISortConfig } from "../../lib/types";

import styles from "./HeadRow.module.css";

interface IProps<ITableItem> {
  columnsConfig: IColumn<ITableItem>[];
  sortConfig: ISortConfig<ITableItem> | null;
  handleSortChange: (key: keyof ITableItem) => void;
}

export const HeadRow = <ITableItem extends object>({
  columnsConfig,
  sortConfig,
  handleSortChange,
}: IProps<ITableItem>) => {
  return (
    <div role="row" className={styles.headRow}>
      {columnsConfig.map(({ key, title, sortable }) => {
        const handleClick = sortable ? () => handleSortChange(key) : undefined;

        let icon: React.ReactNode = null;
        if (sortable && sortConfig?.key === key) {
          icon =
            sortConfig?.direction === "asc" ? (
              <IconChevron className={cx(styles.icon, styles.icon_asc)} />
            ) : (
              <IconChevron className={cx(styles.icon, styles.icon_desc)} />
            );
        }

        return (
          <div role="columnheader" className={styles.headCell} key={String(key)}>
            <A11yButton
              className={cx(styles.button, sortable && styles.button_sortable)}
              onClick={handleClick}
            >
              {title.toUpperCase()}
              {icon}
            </A11yButton>
          </div>
        );
      })}
    </div>
  );
};
