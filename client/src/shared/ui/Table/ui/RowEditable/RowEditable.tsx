import { useEffect, useState } from "react";
import type { IColumn } from "../../lib/types";
import styles from "./RowEditable.module.css";

interface IProps<TableItem> {
  className: string;
  columnsConfig: IColumn<TableItem>[];
  onFormSubmit: (data: TableItem) => void;
  formTitle: string;
}

export const RowEditable = <TableItem extends object>({
  className,
  columnsConfig,
  onFormSubmit,
  formTitle,
}: IProps<TableItem>) => {
  const gridTemplateColumns = columnsConfig.reduce((acc, column) => `${acc} ${column.widthFraction}fr`, "");

  const [message, setMessage] = useState("");

  // убираю сообщение, чтобы пользователь понял, что можно отправлять еще
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  const onSubmit = (formData: FormData) => {
    const data = {};
    for (const column of columnsConfig) {
      // @ts-expect-error мне нужен этот обьект пустым
      data[column.key] = formData.get(String(column.key));
    }
    onFormSubmit(data as TableItem);
    setMessage("Запрос отправлен!");
  };

  return (
    <form className={className} action={onSubmit}>
      <h3 className={styles.title}>{formTitle}</h3>

      <div className={styles.row} style={{ gridTemplateColumns }}>
        {columnsConfig.map(({ key, title, validation }) => (
          <div className={styles.cell} key={String(key)}>
            <label htmlFor={String(key)} className={styles.columnTitle}>
              {title.toUpperCase()}
            </label>

            {validation.type === "number" ? (
              <input
                className={styles.input}
                id={String(key)}
                name={String(key)}
                type={validation.type}
                min={validation.min}
                max={validation.max}
                step={validation.integer ? 1 : 0.01}
                required={validation.required}
              />
            ) : (
              <input
                id={String(key)}
                className={styles.input}
                name={String(key)}
                minLength={validation.minLength}
                maxLength={validation.maxLength}
                required={validation.required}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.buttonBlock}>
        <input className={styles.button} type="submit" value="Отправить" />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </form>
  );
};
