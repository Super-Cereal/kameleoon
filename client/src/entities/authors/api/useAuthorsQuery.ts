import { get } from "@/shared/api/requests";
import { useQuery } from "@tanstack/react-query";

export interface IAuthor {
  id: number;
  name: string;
  genre?: string;
  country?: string;
  activeYears?: string;
}

export const useAuthorsQuery = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => get<IAuthor[]>("/authors"),
  });
};
