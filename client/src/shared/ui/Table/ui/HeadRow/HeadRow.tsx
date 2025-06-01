import cx from "classnames";

import { IconChevron } from "@/shared/ui/Icon";

import type { IColumn } from "../../lib/types";
import type { ISortConfig } from "../../lib/useSort";

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
  const gridTemplateColumns = columnsConfig.reduce((acc, column) => `${acc} ${column.widthFraction}fr`, "");

  return (
    <div className={styles.headRow} style={{ gridTemplateColumns }}>
      {columnsConfig.map(({ key, title, sortable }) => {
        const handleClick = sortable ? () => handleSortChange(key) : undefined;

        let icon: React.ReactNode = null;
        if (sortable && sortConfig?.key === key) {
          icon =
            sortConfig.direction === "asc" ? (
              <IconChevron className={cx(styles.icon, styles.icon_asc)} />
            ) : (
              <IconChevron className={cx(styles.icon, styles.icon_desc)} />
            );
        }

        return (
          <div className={styles.headCell} key={String(key)}>
            <span className={cx(styles.button, sortable && styles.button_sortable)} onClick={handleClick}>
              {title.toUpperCase()}
              {icon}
            </span>
          </div>
        );
      })}
    </div>
  );
};
