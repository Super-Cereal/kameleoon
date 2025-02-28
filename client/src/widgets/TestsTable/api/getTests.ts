import { get } from "@/shared/api/requests/get";

export interface ITest {
  id: number;
  name: string;
  type: string;
  status: "ONLINE" | "PAUSED" | "STOPPED" | "DRAFT";
  siteId: number;
}

export const getTests = async () => {
  return await get<ITest[]>("/tests");
};
