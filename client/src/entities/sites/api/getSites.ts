import { get } from "@/shared/api/requests/get";

export interface ISite {
  id: number;
  url: string;
}

export const getSites = async () => {
  return await get<ISite[]>("/sites");
};
