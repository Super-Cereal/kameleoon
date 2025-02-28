import { Table } from "@/shared/ui/Table";
import { useData } from "@/shared/api/requests/useData";

import { HeadRow } from "../HeadRow/HeadRow";
import { Row } from "../Row/Row";
import { getRows, columns } from "../../model";

export const TestsTable = () => {
  const { data: rows } = useData(getRows, []);

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
