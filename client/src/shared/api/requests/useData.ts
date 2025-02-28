import { useEffect, useState } from "react";

type Falsy = false | 0 | null | undefined;

export const useData = <T>(request: (() => Promise<T>) | Falsy, defs: Array<unknown>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof request !== "function") {
      return;
    }

    setIsLoading(true);

    request()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, defs);

  return { data, isLoading, error };
};
