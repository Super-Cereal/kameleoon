import { post } from "@/shared/api/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IRecord } from "./useRecordsQuery";

export const useRecordsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["records"],
    mutationFn: (record: IRecord) => post<IRecord[]>("/records", record),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });
};
