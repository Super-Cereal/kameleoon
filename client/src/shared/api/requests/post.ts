import { API_URL } from "../config";

export const post = async <Data>(url: string, body?: unknown) => {
  const request = fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  const data = request.then((value) => value.json());

  return data as Promise<Data>;
};
