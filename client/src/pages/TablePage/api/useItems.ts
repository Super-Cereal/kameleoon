import { useAuthorsQuery, type IAuthor } from "@/entities/authors";
import { useRecordsQuery, type IRecord } from "@/entities/records";

export interface IItem extends IRecord {
  authorName: IAuthor["name"];
  authorGenre: IAuthor["genre"];
}

export const useItems = (): { items: IItem[]; isLoading: boolean } => {
  const { data: authors, isFetching: isAuthorsLoading } = useAuthorsQuery();
  const { data: records, isFetching: isRecordsLoading } = useRecordsQuery();

  if (!authors || !records) {
    return { items: [], isLoading: true };
  }

  return {
    items: records.map((record) => {
      const author = authors.find((author) => author.id === record.authorId);

      return {
        ...record,
        authorName: author?.name || "",
        authorGenre: author?.genre || "",
      };
    }),
    isLoading: isAuthorsLoading || isRecordsLoading,
  };
};
