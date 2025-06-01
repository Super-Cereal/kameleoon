export interface IColumn<ITableItem> {
  key: keyof ITableItem;
  title: string;
  sortable?: boolean;
  widthFraction?: number;
}
