import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "~src/components/Layout/Layout";
import { NotFoundPage } from "~src/pages/NotFoundPage/NotFoundPage";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage/AboutPage"));
const UsersPage = React.lazy(() => import("./pages/UsersPage/UsersPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);
