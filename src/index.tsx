import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { ThemeProvider } from "@gravity-ui/uikit";
import queryClient from "./services/queryClient";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n/config";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('There is no element with id "root"');
}

const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
);
