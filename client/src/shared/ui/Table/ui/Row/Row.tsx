import React, { useMemo } from "react";

import type { IColumn } from "../../lib/types";
import styles from "./Row.module.css";

interface IProps<TableItem> {
  item: TableItem;
  columnsConfig: IColumn<TableItem>[];
}

const colors = [
  "#FF3E4D", // Ярко-красный (энергичный, страстный)
  "#00FFA3", // Неоново-зелёный (свежий, технологичный)
  "#FFD700", // Золотой (роскошный, тёплый)
  "#7B2BFF", // Фиолетовый (креативный, мистический)
  "#00B4FF", // Ярко-голубой (сочный, летний)
  "#FF8C00", // Оранжевый (жизнерадостный, энергичный)
  "#FF1493",
];

const RowComponent = <TableItem extends object>({ item, columnsConfig }: IProps<TableItem>) => {
  const gridTemplateColumns = columnsConfig.reduce((acc, column) => `${acc} ${column.widthFraction}fr`, "");

  const backgroundColor = useMemo(() => colors[Math.floor(Math.random() * colors.length)]!, []);

  return (
    <div className={styles.row} style={{ gridTemplateColumns }}>
      <div className={styles.leftBorder} style={{ backgroundColor }} />

      {columnsConfig.map(({ key }) => (
        <div className={styles.cell} key={String(key)}>
          {String(item[key])}
        </div>
      ))}
    </div>
  );
};

// React.memo позволит избежать лишних рендеров при сортировке
export const Row = React.memo(RowComponent) as typeof RowComponent;
