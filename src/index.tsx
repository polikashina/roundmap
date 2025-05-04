import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "@gravity-ui/uikit";
import "./i18n/config";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('There is no element with id "root"');
}

const root = createRoot(container);
root.render(
  <ThemeProvider theme="light">
    <RouterProvider router={router} />
  </ThemeProvider>
);
