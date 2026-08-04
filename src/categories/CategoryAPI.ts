import { checkStatus, parseJSON } from "../utility/fetchUtilities";
import { ICategory } from "./ICategory";

const url = "http://localhost:5038/api/categories";

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
  find(id: number): Promise<ICategory> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
  post(category: ICategory): Promise<ICategory> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(category: ICategory): Promise<ICategory> {
    return fetch(`${url}/${category.id}`, {
      method: "PUT",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
};
