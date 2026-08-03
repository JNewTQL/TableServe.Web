import type { IStaff } from "./IStaff";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/staff`;

export const staffAPI = {
  list(status?: string): Promise<IStaff[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
  find(id: number): Promise<IStaff> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(staffMember: IStaff): Promise<IStaff> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(staffMember),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  put(staffMember: IStaff): Promise<IStaff> {
    return fetch(`${url}/${staffMember.id}`, {
      method: "PUT",
      body: JSON.stringify(staffMember),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
  findByAccount(username: string, password: string): Promise<IStaff> {
    return fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(checkStatus)
      .then(parseJSON);
  },
};
