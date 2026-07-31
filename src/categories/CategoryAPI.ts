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
  post(category: ICategory): Promise<ICategory> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
  put(category: ICategory): Promise<ICategory> {
    return fetch(`${url}/${category.id}`, {
      method: "PUT",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
};
