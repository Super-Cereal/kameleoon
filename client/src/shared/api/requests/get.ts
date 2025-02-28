import axios from "axios";

import { API_URL } from "../config";

export const get = async <T>(url: string) => {
  try {
    const response = await axios.get<T>(`${API_URL}${url.startsWith("/") ? url : `/${url}`}`);

    return response.data;
  } catch (error) {
    console.error(error);
    alert("Error fetching data");
  }
};
