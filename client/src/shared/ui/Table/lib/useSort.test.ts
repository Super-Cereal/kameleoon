import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { useSort } from "./useSort";

const records = [
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
  {
    id: 4,
    name: "Back in Black",
    description: "AC/DC's legendary hard rock album with unforgettable riffs.",
    price: 34.99,
    year: 1980,
    authorId: 4,
  },
  {
    id: 5,
    name: "Rumours",
    description: "Fleetwood Mac's classic with hits like 'Go Your Own Way'.",
    price: 42.75,
    year: 1977,
    authorId: 5,
  },
  {
    id: 6,
    name: "Nevermind",
    description: "Nirvana's breakthrough album that defined the grunge era.",
    price: 37.99,
    year: 1991,
    authorId: 6,
  },
  {
    id: 7,
    name: "The Wall",
    description: "Pink Floyd's rock opera exploring themes of isolation and rebellion.",
    price: 52.25,
    year: 1979,
    authorId: 1,
  },
  {
    id: 8,
    name: "Led Zeppelin IV",
    description: "Featuring 'Stairway to Heaven', one of the greatest rock albums ever.",
    price: 47.5,
    year: 1971,
    authorId: 7,
  },
  {
    id: 9,
    name: "Hotel California",
    description: "The Eagles' iconic album with the legendary title track.",
    price: 41.99,
    year: 1976,
    authorId: 8,
  },
  {
    id: 10,
    name: "Born to Run",
    description: "Bruce Springsteen's epic album that launched him to superstardom.",
    price: 38.75,
    year: 1975,
    authorId: 9,
  },
];
const recordsSortedByPrice = [...records].sort((a, b) => a.price - b.price);
const recordsSortedByName = [...records].sort((a, b) => (a.name < b.name ? -1 : 1));

describe("hook useSort", () => {
  it("does not change items on first render", () => {
    const hookRef = renderHook(() => useSort(records));
    expect(hookRef.result.current.sortedItems).toEqual(records);
  });

  it("rerender without params changes returns same array", () => {
    const hookRef = renderHook(() => useSort(records));
    expect(hookRef.result.current.sortedItems).toEqual(records);

    const firstRenderItems = hookRef.result.current.sortedItems;
    hookRef.rerender();

    const secondRenderItems = hookRef.result.current.sortedItems;
    expect(firstRenderItems).toBe(secondRenderItems);
  });

  it("handleSortChange changes sorting order (string params)", () => {
    const hookRef = renderHook(() => useSort(records));

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("name");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");
    expect(hookRef.result.current.sortedItems).toEqual(recordsSortedByName);

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("name");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("desc");
    expect(hookRef.result.current.sortedItems).toEqual([...recordsSortedByName].reverse());

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig).toBeFalsy();
    expect(hookRef.result.current.sortedItems).toEqual(records);

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("name");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");
    expect(hookRef.result.current.sortedItems).toEqual(recordsSortedByName);
  });

  it("handleSortChange changes sorting order (number params)", () => {
    const hookRef = renderHook(() => useSort(records));

    act(() => {
      hookRef.result.current.handleSortChange("price");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("price");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");
    expect(hookRef.result.current.sortedItems).toEqual(recordsSortedByPrice);

    act(() => {
      hookRef.result.current.handleSortChange("price");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("price");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("desc");
    expect(hookRef.result.current.sortedItems).toEqual([...recordsSortedByPrice].reverse());

    act(() => {
      hookRef.result.current.handleSortChange("price");
    });
    expect(hookRef.result.current.sortConfig).toBeFalsy();
    expect(hookRef.result.current.sortedItems).toEqual(records);

    act(() => {
      hookRef.result.current.handleSortChange("price");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("price");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");
    expect(hookRef.result.current.sortedItems).toEqual(recordsSortedByPrice);
  });

  it("handleSortChange with different key change sorting to asc", () => {
    const hookRef = renderHook(() => useSort(records));

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("name");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");

    act(() => {
      hookRef.result.current.handleSortChange("name");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("name");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("desc");

    act(() => {
      hookRef.result.current.handleSortChange("price");
    });
    expect(hookRef.result.current.sortConfig?.key).toEqual("price");
    expect(hookRef.result.current.sortConfig?.direction).toEqual("asc");
    expect(hookRef.result.current.sortedItems).toEqual(recordsSortedByPrice);
  });
});
