import { ICategory } from "./ICategory";

const url = "http://localhost:5038/api/categories";

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then((response) => response.json());
  },
  find(id: number): Promise<ICategory> {
    return fetch(`${url}/${id}`).then((response) => response.json());
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
};
