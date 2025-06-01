import { get } from "@/shared/api/requests";
import { useQuery } from "@tanstack/react-query";

export interface IRecord {
  id: number;
  name: string;
  description: string;
  price: number;
  year: number;
  authorId: number;
}

export const useRecordsQuery = () => {
  return useQuery({
    queryKey: ["records"],
    queryFn: () => get<IRecord[]>("/records"),
  });
};
