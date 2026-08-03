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
import OrderDetailPage from "./orders/OrderDetailPage";
import CategoryDetailPage from "./categories/CategoryDetailPage";
import CategoryPage from "./categories/CategoriesPage";
import OrderItemCreatePage from "./orderItems/OrderItemCreatePage";
import OrderItemEditPage from "./orderItems/OrderItemEditPage";
import CategoryCreatePage from "./categories/CategoryCreatePage";
import CategoryEditPage from "./categories/CategoryEditPage";
import SignInPage from "./account/SignInPage";
import IndexPage from "./IndexPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // outer wrapper — holds Context + Toaster
    errorElement: <ErrorPage />, // moved up here from the Layout route
    children: [
      { path: "signin", element: <SignInPage /> }, // sibling of Layout → no shell
      {
        element: <Layout />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: "menuitems", element: <MenuItemsPage /> },
          { path: "menuitems/create", element: <MenuItemCreatePage /> },
          { path: "menuitems/edit/:id", element: <MenuItemEditPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/detail/:id", element: <OrderDetailPage /> },
          { path: "orders/detail/:id/orderitem/create", element: <OrderItemCreatePage /> },
          { path: "orders/detail/:id/orderitem/edit/:itemId", element: <OrderItemEditPage /> },
          { path: "categories", element: <CategoryPage /> },
          { path: "categories/detail/:id", element: <CategoryDetailPage /> },
          { path: "categories/create", element: <CategoryCreatePage /> },
          { path: "categories/edit/:id", element: <CategoryEditPage /> },
          { path: "staff", element: <StaffPage /> },
          { path: "staff/create", element: <StaffCreatePage /> },
          { path: "staff/edit/:id", element: <StaffEditPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
