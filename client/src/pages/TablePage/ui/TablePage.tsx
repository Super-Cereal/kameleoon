import { Table } from "@/shared/ui/Table";

import { useItems } from "../api/useItems";

export const TablePage = () => {
  const items = useItems();

  return (
    <Table
      items={items}
      primaryKey="id"
      columnsConfig={[
        { key: "name", title: "Название", sortable: true, widthFraction: 3 },
        { key: "description", title: "Описание", sortable: false, widthFraction: 4 },
        { key: "price", title: "Цена", sortable: true, widthFraction: 1 },
        { key: "year", title: "Год выпуска", sortable: true, widthFraction: 2 },
        { key: "authorName", title: "Автор", sortable: true, widthFraction: 3 },
        { key: "authorGenre", title: "Жанр автора", sortable: false, widthFraction: 3 },
      ]}
    />
  );
};
