import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

import { API_URL } from "@/shared/api/config";
import { describe, it, expect } from "vitest";

import { authors } from "@/entities/authors/testing";
import { records } from "@/entities/records/testing";
import { useItems, type IItem } from "./useItems";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const items: IItem[] = [
  {
    id: 1,
    name: "The Dark Side of the Moon",
    description: "Legendary album by Pink Floyd, a masterpiece of progressive rock.",
    price: 49.99,
    year: 1973,
    authorId: 1,
    authorName: "Pink Floyd",
    authorGenre: "Progressive Rock",
  },
  {
    id: 2,
    name: "Thriller",
    description: "Best-selling album of all time by Michael Jackson.",
    price: 39.99,
    year: 1982,
    authorId: 2,
    authorName: "Michael Jackson",
    authorGenre: "Pop, R&B, Funk",
  },
  {
    id: 3,
    name: "Abbey Road",
    description: "The Beatles' iconic album featuring hits like 'Come Together'.",
    price: 45.5,
    year: 1969,
    authorId: 3,
    authorName: "The Beatles",
    authorGenre: "Rock, Pop",
  },
];

nock(API_URL).get("/authors").reply(200, authors);
nock(API_URL).get("/records").reply(200, records);

describe("useItems hook", () => {
  it("returnsData", async () => {
    const hookRef = renderHook(() => useItems(), { wrapper });

    await waitFor(() => expect(hookRef.result.current.length).toBeTruthy());

    expect(hookRef.result.current).toEqual(items);
  });
});
