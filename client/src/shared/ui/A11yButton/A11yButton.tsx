import type { HTMLAttributes, PropsWithChildren } from "react";

import cx from "classnames";

import styles from "./A11yButton.module.css";

interface A11yButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/** Дает использовать семантическую кнопку, при этом не меняя отображение. */
export const A11yButton = ({ className, children, ...rest }: A11yButtonProps) => (
  <button {...rest} className={cx(styles.button, className)}>
    {children}
  </button>
);
