import { post } from "@/shared/api/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IAuthor } from "./useAuthorsQuery";

export const useAuthorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["authors"],
    mutationFn: (author: IAuthor) => post<IAuthor[]>("/authors", author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
};
