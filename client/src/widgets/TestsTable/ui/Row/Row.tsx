import React from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

import { Button } from "@/shared/ui/Button";

import { parseSiteUrl, statusColors, type IRow } from "../../model";

import styles from "./Row.module.css";

interface IProps {
  item: IRow;
  gridTemplateColumns: string;
}

// React.memo позволит избежать лишних рендеров при сортировке
export const Row = React.memo(({ item, gridTemplateColumns }: IProps) => {
  const statusView = item.status[0].toUpperCase() + item.status.slice(1).toLowerCase();
  const statusColor = statusColors[item.status];
  const siteUrl = item.site ? parseSiteUrl(item.site.url) : "no site";

  const navigate = useNavigate();

  const buttonProps =
    item.status === "DRAFT"
      ? ({ view: "secondary", onClick: () => navigate(`/finalize/${item.id}`), children: "Finalize" } as const)
      : ({ view: "primary", onClick: () => navigate(`/results/${item.id}`), children: "Results" } as const);

  return (
    <div role="row" onClick={buttonProps.onClick} style={{ gridTemplateColumns }} className={styles.row}>
      <div className={cx(styles.cell, styles.cell_name)}>
        <div className={styles.leftBorder} style={{ backgroundColor: statusColor }} />
        {item.name}
      </div>
      <div className={styles.cell}>{item.type}</div>
      <div className={cx(styles.cell, styles.cell_status)} style={{ color: statusColor }}>
        {statusView}
      </div>
      <div className={cx(styles.cell, styles.cell_withButton)}>
        {siteUrl}
        <Button {...buttonProps} />
      </div>
    </div>
  );
});
