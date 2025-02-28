import { get } from "@/shared/api/requests/get";

import type { ITest } from "./getTests";

export const getTest = async (id: number | string) => {
  return await get<ITest>(`/tests/${id}`);
};
