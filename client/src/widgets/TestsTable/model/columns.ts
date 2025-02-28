import type { ITableColumn } from "@/shared/ui/Table";

import type { IRow } from "./getRows";

const sortedStatusOrder = {
  ONLINE: 0,
  PAUSED: 1,
  STOPPED: 2,
  DRAFT: 3,
};

/** Убирает протокол и www. из url */
export const parseSiteUrl = (url: string) => {
  const [, domain] = url.split("://");
  return domain.startsWith("www.") ? domain.slice(4) : domain;
};

const statusCompareFn = (a: IRow, b: IRow) =>
  sortedStatusOrder[a.status] - sortedStatusOrder[b.status];

const siteCompareFn = (a: IRow, b: IRow) => {
  const aUrl = a.site ? parseSiteUrl(a.site.url) : "";
  const bUrl = b.site ? parseSiteUrl(b.site.url) : "";
  return aUrl < bUrl ? -1 : 1;
};

export const columns: ITableColumn<IRow>[] = [
  { key: "name", title: "NAME", sortable: true, widthFraction: 3 },
  { key: "type", title: "TYPE", sortable: true, widthFraction: 1 },
  {
    key: "status",
    title: "STATUS",
    sortable: true,
    sortCompareFn: statusCompareFn,
    widthFraction: 1,
  },
  { key: "site", title: "SITE", sortable: true, sortCompareFn: siteCompareFn, widthFraction: 2 },
];

export const statusColors = {
  ONLINE: "var(--font-color-green)",
  PAUSED: "var(--font-color-orange)",
  STOPPED: "var(--font-color-red)",
  DRAFT: "var(--font-color-secondary)",
};
