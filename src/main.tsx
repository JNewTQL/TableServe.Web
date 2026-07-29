import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MenuItemsPage from "./menuItems/MenuItemsPage";
import OrdersPage from "./orders/OrdersPage";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import StaffPage from "./staff/StaffPage";
import "./index.css";
import MenuItemCreatePage from "./menuItems/MenuItemCreatePage";
import MenuItemEditPage from "./menuItems/MenuItemEditPage";
import StaffCreatePage from "./staff/StaffCreatePage";
import StaffEditPage from "./staff/StaffEditPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "menuitems", element: <MenuItemsPage /> },
      { path: "menuitems/create", element: <MenuItemCreatePage /> },
      { path: "menuitems/edit/:id", element: <MenuItemEditPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff/create", element: <StaffCreatePage /> },
      { path: "staff/edit/:id", element: <StaffEditPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
