import { API_URL } from "../config";

export const get = async <Data>(url: string) => {
  const request = fetch(`${API_URL}${url}`);
  const data = request.then((value) => value.json());

  return data as Promise<Data>;
};
