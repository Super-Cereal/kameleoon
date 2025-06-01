import type { IColumn } from "../../lib/types";
import { useSort } from "../../lib/useSort";

import { Row } from "../Row/Row";
import { HeadRow } from "../HeadRow/HeadRow";

import styles from "./Table.module.css";
import { Loading } from "@/shared/ui/Loading";
import { RowEditable } from "../RowEditable/RowEditable";

interface IProps<ITableItem> {
  items: ITableItem[];
  primaryKey: keyof ITableItem;
  columnsConfig: IColumn<ITableItem>[];
  tableTitle: string;
  onFormSubmit: (data: ITableItem) => void;
  formTitle: string;
}

export const Table = <ITableItem extends object>({
  items,
  primaryKey,
  columnsConfig,
  tableTitle,
  onFormSubmit,
  formTitle,
}: IProps<ITableItem>) => {
  const { sortedItems, sortConfig, handleSortChange } = useSort(items);

  if (!items.length) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <RowEditable
        className={styles.rowEditable}
        formTitle={formTitle}
        columnsConfig={columnsConfig}
        onFormSubmit={onFormSubmit}
      />

      <h3 className={styles.title}>{tableTitle}</h3>
      <HeadRow columnsConfig={columnsConfig} sortConfig={sortConfig} handleSortChange={handleSortChange} />

      {sortedItems.map((item) => (
        <Row key={String(item[primaryKey])} item={item} columnsConfig={columnsConfig} />
      ))}
    </div>
  );
};
