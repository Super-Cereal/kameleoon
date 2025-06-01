import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

import { API_URL } from "@/shared/api/config";
import { describe, it, expect } from "vitest";
import { type IRecord, useRecordsQuery } from "./useRecordsQuery";

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

export const records: IRecord[] = [
  {
    id: 1,
    name: "The Dark Side of the Moon",
    description: "Legendary album by Pink Floyd, a masterpiece of progressive rock.",
    price: 49.99,
    year: 1973,
    authorId: 1,
  },
  {
    id: 2,
    name: "Thriller",
    description: "Best-selling album of all time by Michael Jackson.",
    price: 39.99,
    year: 1982,
    authorId: 2,
  },
  {
    id: 3,
    name: "Abbey Road",
    description: "The Beatles' iconic album featuring hits like 'Come Together'.",
    price: 45.5,
    year: 1969,
    authorId: 3,
  },
];

nock(API_URL).get("/records").reply(200, records);

describe("useRecordsQuery hook", () => {
  it("returnsData", async () => {
    const hookRef = renderHook(() => useRecordsQuery(), { wrapper });

    await waitFor(() => expect(hookRef.result.current.isSuccess).toBe(true));

    expect(hookRef.result.current.data).toEqual(records);
  });
});
