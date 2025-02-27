import type { ReactNode } from "react";

import { BackButton } from "../BackButton/BackButton";

import styles from "./PageLayout.module.css";

interface Props {
  title: string;
  subtitle?: string;
  hasBackButton?: boolean;

  children: ReactNode;
}

export const PageLayout = ({
  title,
  subtitle,
  hasBackButton,

  children,
}: Props) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </header>

      <main className={styles.content}>{children}</main>

      {hasBackButton && (
        <footer className={styles.footer}>
          <BackButton />
        </footer>
      )}
    </div>
  );
};
