import cx from "classnames";

import type { IColumn, ISortConfig } from "../../lib/types";
import { useSort } from "../../lib/useSort";
import { useFilter } from "../../lib/useFilter";

import { SearchBar } from "../SearchBar/SearchBar";
import { Row } from "../Row/Row";
import { HeadRow } from "../HeadRow/HeadRow";

import styles from "./Table.module.css";

interface IProps<ITableItem> {
  items: ITableItem[];
  primaryKey: keyof ITableItem;
  columnsConfig: IColumn<ITableItem>[];
  withFilterBy?: keyof ITableItem;
  classNames?: {
    container?: string;
    table?: string;
  };

  RowComponent?: React.ComponentType<{
    item: ITableItem;
    columnsConfig: IColumn<ITableItem>[];
  }>;
  HeadRowComponent?: React.ComponentType<{
    columnsConfig: IColumn<ITableItem>[];
    sortConfig: ISortConfig<ITableItem> | null;
    handleSortChange: (key: keyof ITableItem) => void;
  }>;
}

export const Table = <ITableItem extends object>({
  items,
  primaryKey,
  columnsConfig,
  withFilterBy,
  classNames,

  RowComponent = Row,
  HeadRowComponent = HeadRow,
}: IProps<ITableItem>) => {
  const { filteredItems, filterTextView, handleFilterChange } = useFilter(items, withFilterBy);
  const {
    sortedItems: filteredAndSortedItems,
    sortConfigView,
    handleSortChange,
  } = useSort(filteredItems, columnsConfig);

  return (
    <div className={cx(styles.tableContainer, classNames?.container)}>
      {withFilterBy && <SearchBar value={filterTextView} onChange={handleFilterChange} className={styles.searchBar} />}

      <div role="table" className={cx(styles.table, classNames?.table)}>
        <div role="rowgroup">
          <HeadRowComponent
            columnsConfig={columnsConfig}
            sortConfig={sortConfigView}
            handleSortChange={handleSortChange}
          />
        </div>
        <div role="rowgroup">
          {filteredAndSortedItems.map((item) => (
            <RowComponent key={String(item[primaryKey])} item={item} columnsConfig={columnsConfig} />
          ))}
        </div>
      </div>
    </div>
  );
};
