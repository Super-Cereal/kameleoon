import { useEffect, useState } from "react";

import { columns } from "./columns";
import { getRows, type IRow } from "./getRows";

export const useRowsAndColumns = () => {
  const [rows, setRows] = useState<IRow[] | null>(null);

  useEffect(() => {
    if (!rows) {
      getRows().then((rows) => setRows(rows));
    }
  }, [rows]);

  return { rows, columns };
};
