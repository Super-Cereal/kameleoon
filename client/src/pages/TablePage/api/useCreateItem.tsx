import { type IAuthor, useAuthorsMutation } from "@/entities/authors";
import { type IRecord, useRecordsMutation } from "@/entities/records";

import type { IItem } from "./useItems";

export const useCreateItem = () => {
  const { mutate: addAuthor, isPending: isAuthorsLoading } = useAuthorsMutation();
  const { mutate: addRecord, isPending: isRecordsLoading } = useRecordsMutation();

  return {
    createItem: (data: IItem) => {
      const newAuthor: IAuthor = {
        id: Math.random() * 10000000,
        name: data.authorName,
        genre: data.authorGenre,
      };

      const newRecord: IRecord = {
        id: Math.random() * 10000000,
        name: data.name,
        description: data.description,
        price: data.price,
        year: data.year,
        authorId: newAuthor.id,
      };

      addAuthor(newAuthor);
      addRecord(newRecord);
    },
    isLoading: isAuthorsLoading || isRecordsLoading,
  };
};
