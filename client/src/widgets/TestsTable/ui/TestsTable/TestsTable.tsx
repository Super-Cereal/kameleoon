import { Table } from "@/shared/ui/Table";

import { useRowsAndColumns } from "../../model";
import { HeadRow } from "../HeadRow/HeadRow";
import { Row } from "../Row/Row";

export const TestsTable = () => {
  const { rows, columns } = useRowsAndColumns();

  // Размеры столбцов таблицы
  // Столбцов не так много, поэтому не использую useMemo
  const gridTemplateColumns = columns.reduce((acc, column) => `${acc} ${column.widthFraction}fr`, "");

  return (
    <Table
      items={rows || []}
      primaryKey="id"
      columnsConfig={columns}
      withFilterBy="name"
      RowComponent={(props) => <Row {...props} gridTemplateColumns={gridTemplateColumns} />}
      HeadRowComponent={(props) => <HeadRow {...props} gridTemplateColumns={gridTemplateColumns} />}
    />
  );
};
