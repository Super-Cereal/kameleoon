import { useRef } from "react";
import cx from "classnames";

import type { IColumn, ISortConfig } from "../../lib/types";
import { useSort } from "../../lib/useSort";
import { useFilter } from "../../lib/useFilter";

import { EmptyState } from "../EmptyState/EmptyState";
import { SearchBar } from "../SearchBar/SearchBar";
import { Row } from "../Row/Row";
import { HeadRow } from "../HeadRow/HeadRow";

import styles from "./Table.module.css";

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
  entityName,
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

  const filterInputRef = useRef<HTMLInputElement>(null);

  let content = null;
  if (!items.length) {
    content = "loading...";
  } else if (!filteredAndSortedItems.length) {
    content = <EmptyState filterInputRef={filterInputRef} handleFilterChange={handleFilterChange} />;
  } else {
    content = (
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
    );
  }

  const searchBarCaption = `${filteredAndSortedItems.length} ${entityName}${
    filteredAndSortedItems.length === 1 ? "" : "s"
  }`;

  return (
    <div className={cx(styles.tableContainer, classNames?.container)}>
      {withFilterBy && (
        <SearchBar
          caption={searchBarCaption}
          inputRef={filterInputRef}
          value={filterTextView}
          onChange={handleFilterChange}
          className={styles.searchBar}
        />
      )}

      {content}
    </div>
  );
};
