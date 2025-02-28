export interface IColumn<ITableItem> {
  key: keyof ITableItem;
  title: string;
  sortable?: boolean;
  sortCompareFn?: (a: ITableItem, b: ITableItem) => number;
  widthFraction?: number;
}

export interface ISortConfig<ITableItem> {
  key: keyof ITableItem;
  direction: "asc" | "desc";
}
