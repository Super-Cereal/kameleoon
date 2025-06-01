import { Table } from "@/shared/ui/Table";

import { useItems, type IItem } from "../api/useItems";

export const TablePage = () => {
  const items = useItems();

  const onFormSubmit = (data: IItem) => {
    console.log(data);
  };

  return (
    <Table
      items={items}
      primaryKey="id"
      onFormSubmit={onFormSubmit}
      formTitle="Добавить новую пластинку в коллекцию!"
      tableTitle="Моя сортируемая коллекция пластинок!"
      columnsConfig={[
        {
          key: "name",
          title: "Название",
          sortable: true,
          widthFraction: 3,
          validation: {
            type: "string",
            minLength: 3,
            required: true,
          },
        },
        {
          key: "description",
          title: "Описание",
          widthFraction: 4,
          validation: {
            type: "string",
            maxLength: 100,
          },
        },
        {
          key: "price",
          title: "Цена",
          sortable: true,
          widthFraction: 1,
          validation: {
            type: "number",
            min: 1,
            required: true,
          },
        },
        {
          key: "year",
          title: "Год выпуска",
          sortable: true,
          widthFraction: 2,
          validation: {
            type: "number",
            min: 1948,
            max: new Date().getFullYear(),
            integer: true,
            required: true,
          },
        },
        {
          key: "authorName",
          title: "Автор",
          sortable: true,
          widthFraction: 3,
          validation: {
            type: "string",
            minLength: 3,
            required: true,
          },
        },
        {
          key: "authorGenre",
          title: "Жанр автора",
          widthFraction: 3,
          validation: {
            type: "string",
            maxLength: 40,
          },
        },
      ]}
    />
  );
};
