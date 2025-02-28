import type { HTMLAttributes, PropsWithChildren } from "react";
import cx from "classnames";

import { A11yButton } from "../A11yButton";

import styles from "./Button.module.css";

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  view?: "primary" | "secondary";
  className?: string;
}

export const Button = ({ view = "primary", className, children, ...rest }: IProps) => {
  return (
    <A11yButton {...rest} className={cx(styles.button, styles[`button_${view}`], className)}>
      {children}
    </A11yButton>
  );
};
