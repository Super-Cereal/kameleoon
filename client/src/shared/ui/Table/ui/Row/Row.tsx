import React from "react";

import type { IColumn } from "../../lib/types";

interface IProps<TableItem> {
  item: TableItem;
  columnsConfig: IColumn<TableItem>[];
}

const RowComponent = <TableItem extends object>({ item, columnsConfig }: IProps<TableItem>) => {
  return (
    <div role="row">
      {columnsConfig.map(({ key }) => (
        <div role="cell" key={String(key)}>
          {String(item[key])}
        </div>
      ))}
    </div>
  );
};

// React.memo позволит избежать лишних рендеров при сортировке
export const Row = React.memo(RowComponent) as typeof RowComponent;
