import { ICategory } from "./ICategory";

const url = "http://localhost:5038/api/categories";

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then((response) => response.json());
  },
};
