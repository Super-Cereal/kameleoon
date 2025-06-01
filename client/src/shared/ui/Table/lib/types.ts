export type IColumn<ITableItem> = {
  key: keyof ITableItem;
  title: string;
  sortable?: boolean;
  widthFraction?: number;
  validation:
    | {
        type: "number";
        min?: number;
        max?: number;
        integer?: boolean;
        required?: boolean;
      }
    | {
        type: "string";
        minLength?: number;
        maxLength?: number;
        required?: boolean;
      };
};
