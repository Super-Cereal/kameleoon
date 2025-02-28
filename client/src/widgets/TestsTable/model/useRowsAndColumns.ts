import { useData } from "@/shared/api/requests";

import { columns } from "./columns";
import { getRows } from "./getRows";

export const useRowsAndColumns = () => {
  const { data: rows } = useData(getRows, []);

  return { rows, columns };
};
