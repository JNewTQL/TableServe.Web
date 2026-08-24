import { http, HttpResponse } from "msw";
import { IMenuItem } from "../menuItems/IMenuItem";
import { IStaff } from "../staff/IStaff";

export const menuItems: IMenuItem[] = [
  {
    id: 1,
    name: "Loaded Fries",
    price: 8.5,
    categoryId: 2,
    category: { id: 2, name: "Sides", sortOrder: 1 },
  },
  {
    id: 2,
    name: "House Burger",
    price: 14,
    categoryId: 1,
    category: { id: 1, name: "Mains", sortOrder: 0 },
  },
];

export const staff: IStaff[] = [
  {
    id: 1,
    username: "ada.lovelace",
    password: "",
    firstName: "Ada",
    lastName: "Lovelace",
    phone: "8005551234",
    email: "ada@tableserve.test",
    isManager: true,
    isAdmin: false,
  },
  {
    id: 2,
    username: "grace.hopper",
    password: "",
    firstName: "Grace",
    lastName: "Hopper",
    phone: "8005559876",
    email: "grace@tableserve.test",
    isManager: false,
    isAdmin: false,
  },
  {
    id: 3,
    username: "alan.turing",
    password: "",
    firstName: "Alan",
    lastName: "Turing",
    phone: "8005554321",
    email: "alan@tableserve.test",
    isManager: false,
    isAdmin: false,
  },
];

export const handlers = [
  http.get("http://localhost:5038/api/menuitems", () => {
    return HttpResponse.json(menuItems);
  }),
  http.get("http://localhost:5038/api/staff", () => {
    return HttpResponse.json(staff);
  }),
  http.delete("http://localhost:5038/api/staff/:id", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
