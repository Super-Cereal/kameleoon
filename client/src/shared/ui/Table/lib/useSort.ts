import { useState, useCallback, useMemo } from "react";

export interface ISortConfig<ITableItem> {
  key: keyof ITableItem;
  direction: "asc" | "desc";
}

export const useSort = <ITableItem extends object>(items: ITableItem[]) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig<ITableItem> | null>(null);

  const handleSortChange = useCallback(
    (key: keyof ITableItem) => {
      let newDirection: "asc" | "desc" | null;

      // Если нажата кнопка на том же столбце, то меняем направление сортировки
      // asc -> desc -> null
      if (sortConfig?.key === key) {
        newDirection = sortConfig.direction === "asc" ? "desc" : null;
      } else {
        newDirection = "asc";
      }

      setSortConfig(newDirection ? { key, direction: newDirection } : null);
    },
    [sortConfig]
  );

  const sortedItems = useMemo(() => {
    // Копируем, чтобы не изменять исходный массив
    const newItems = [...items];
    if (!sortConfig) return newItems;

    return newItems.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortConfig, items]);

  return { sortedItems, sortConfig, handleSortChange };
};
