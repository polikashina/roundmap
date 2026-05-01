import React, { useEffect, useState, FC, PropsWithChildren } from "react";
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

const OtherFc = () => {
  console.log("children");

  return <div>children</div>;
};

const MainFc: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(0);
  // console.log('state', state);
  // console.log('rer');

  useEffect(() => {
    setInterval(() => {
      setState((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <div>{state}</div>
      <OtherFc />
      {/* {children} */}
    </div>
  );
};

export const App = () => {
  console.log("app");

  return (
    <MainFc>
      <OtherFc />
    </MainFc>
  );
};

const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme="light">
      {/* <RouterProvider router={router} /> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
);
