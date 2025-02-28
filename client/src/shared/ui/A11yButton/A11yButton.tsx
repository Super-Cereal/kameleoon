import type { HTMLAttributes, PropsWithChildren } from "react";

import cx from "classnames";

import styles from "./A11yButton.module.css";

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/** Дает использовать семантическую кнопку, при этом не меняя отображение. */
export const A11yButton = ({ className, children, ...rest }: IProps) => (
  <button {...rest} className={cx(styles.button, className)}>
    {children}
  </button>
);
