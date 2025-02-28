import { useState, useTransition, useCallback, useMemo } from "react";

import type { ISortConfig, IColumn } from "./types";

export const useSort = <ITableItem extends object>(
  items: ITableItem[],
  columnsConfig: IColumn<ITableItem>[]
) => {
  // Значение для перехода
  const [sortConfig, setSortConfig] = useState<ISortConfig<ITableItem> | null>(null);
  // Значение для отображения
  const [sortConfigView, setSortConfigView] = useState<typeof sortConfig>(null);
  const startSortTransition = useTransition()[1];

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

      // Меняем отображение и запускаем несрочный переход для сортировки
      const newSortConfig = newDirection ? { key, direction: newDirection } : null;
      setSortConfigView(newSortConfig);
      startSortTransition(() => {
        setSortConfig(newSortConfig);
      });
    },
    [sortConfig, startSortTransition]
  );

  const sortedItems = useMemo(() => {
    // Копируем, чтобы не изменять исходный и возвращать из useMemo всегда новый
    const newItems = [...items];
    if (!sortConfig) return newItems;

    const compareFn = columnsConfig.find((column) => column.key === sortConfig.key)?.sortCompareFn;
    if (compareFn)
      return newItems.sort(sortConfig.direction === "asc" ? compareFn : (a, b) => compareFn(b, a));

    return newItems.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortConfig, items, columnsConfig]);

  return { sortedItems, sortConfigView, handleSortChange };
};
