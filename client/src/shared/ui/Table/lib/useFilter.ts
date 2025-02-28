import { useState, useTransition, useCallback, useMemo } from "react";

export const useFilter = <ITableItem extends object>(
  items: ITableItem[],
  filterBy?: keyof ITableItem
) => {
  // Значение для перехода
  const [filterText, setFilterText] = useState("");
  // Значение для отображения
  const [filterTextView, setFilterTextView] = useState<typeof filterText>("");
  const startFilterTransition = useTransition()[1];

  const handleFilterChange = useCallback(
    (newFilterText: string) => {
      // Меняем отображение и запускаем несрочный переход для фильтрации
      setFilterTextView(newFilterText);
      startFilterTransition(() => {
        setFilterText(newFilterText);
      });
    },
    [startFilterTransition]
  );

  const filteredItems = useMemo(() => {
    if (!filterText || !filterBy) return items;

    return items.filter((item) =>
      String(item[filterBy]).toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, filterBy, items]);

  return { filteredItems, filterTextView, handleFilterChange };
};
