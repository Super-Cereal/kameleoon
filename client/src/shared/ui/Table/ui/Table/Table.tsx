import type { IColumn } from "../../lib/types";
import { useSort } from "../../lib/useSort";

import { Row } from "../Row/Row";
import { HeadRow } from "../HeadRow/HeadRow";

import styles from "./Table.module.css";
import { Loading } from "@/shared/ui/Loading";

interface IProps<ITableItem> {
  items: ITableItem[];
  primaryKey: keyof ITableItem;
  columnsConfig: IColumn<ITableItem>[];
  withFilterBy?: keyof ITableItem;
  entityName?: string;
  classNames?: {
    container?: string;
    table?: string;
  };
}

export const Table = <ITableItem extends object>({ items, primaryKey, columnsConfig }: IProps<ITableItem>) => {
  const { sortedItems, sortConfig, handleSortChange } = useSort(items);

  if (!items.length) {
    return (
      <div className={styles.tableContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <HeadRow columnsConfig={columnsConfig} sortConfig={sortConfig} handleSortChange={handleSortChange} />

      {sortedItems.map((item) => (
        <Row key={String(item[primaryKey])} item={item} columnsConfig={columnsConfig} />
      ))}
    </div>
  );
};
