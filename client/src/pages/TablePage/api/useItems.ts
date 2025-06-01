import { useAuthorsQuery, type IAuthor } from "@/entities/authors";
import { useRecordsQuery, type IRecord } from "@/entities/records";

export interface IItem extends IRecord {
  authorName: IAuthor["name"];
  authorGenre: IAuthor["genre"];
}

export const useItems = (): IItem[] => {
  const { data: authors } = useAuthorsQuery();
  const { data: records } = useRecordsQuery();

  if (!authors || !records) {
    return [];
  }

  return records.map((record) => {
    const author = authors.find((author) => author.id === record.authorId);

    if (!author) {
      throw Error("Author not found");
    }

    return {
      ...record,
      authorName: author.name,
      authorGenre: author.genre,
    };
  });
};
