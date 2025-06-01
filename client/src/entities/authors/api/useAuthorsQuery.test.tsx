import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

import { API_URL } from "@/shared/api/config";
import { describe, it, expect } from "vitest";
import { useAuthorsQuery, type IAuthor } from "./useAuthorsQuery";

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

export const authors: IAuthor[] = [
  {
    id: 1,
    name: "Pink Floyd",
    genre: "Progressive Rock",
    country: "UK",
    activeYears: "1965–1995, 2005, 2012–2014",
  },
  {
    id: 2,
    name: "Michael Jackson",
    genre: "Pop, R&B, Funk",
    country: "USA",
    activeYears: "1964–2009",
  },
  {
    id: 3,
    name: "The Beatles",
    genre: "Rock, Pop",
    country: "UK",
    activeYears: "1960–1970",
  },
];

nock(API_URL).get("/authors").reply(200, authors);

describe("useAuthorsQuery hook", () => {
  it("returnsData", async () => {
    const hookRef = renderHook(() => useAuthorsQuery(), { wrapper });

    await waitFor(() => expect(hookRef.result.current.isSuccess).toBe(true));

    expect(hookRef.result.current.data).toEqual(authors);
  });
});
