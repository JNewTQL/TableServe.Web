import type { IStaff } from "./IStaff";

const url = "http://localhost:5038/api/staff";

export const staffAPI = {
  list(status?: string): Promise<IStaff[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then((response) => response.json());
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
  find(id: number): Promise<IStaff> {
    return fetch(`${url}/${id}`).then((response) => response.json());
  },
  post(staffMember: IStaff): Promise<IStaff> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(staffMember),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
  put(staffMember: IStaff): Promise<IStaff> {
    return fetch(`${url}/${staffMember.id}`, {
      method: "PUT",
      body: JSON.stringify(staffMember),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
};
