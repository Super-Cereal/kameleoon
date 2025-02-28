import { get } from "@/shared/api/requests/get";

import type { ISite } from "./getSites";

export const getSite = async (id: number | string) => {
  return await get<ISite>(`/sites/${id}`);
};
