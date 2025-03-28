import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Text, Loader } from "@gravity-ui/uikit";
import { ErrorBoundary } from "~src/components/ErrorBoundary/ErrorBoundary";
import cn from "classnames";
import styles from "./Layout.css";
import Logo from "~assets/logo.svg";

export const Layout = () => {
  return (
    <ErrorBoundary>
      <main className={styles.layout}>
        <nav>
          <ul className={styles.layout__list}>
            <li className={styles["layout__item-home"]}>
              <Link
                to="/"
                className={cn(styles.layout__link, styles["layout__link-home"])}
              >
                <Logo />
                <Text variant="subheader-2">roundMap</Text>
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.layout__link}>
                About us
              </Link>
            </li>
          </ul>
        </nav>
        <section className={styles.layout__section}>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </ErrorBoundary>
  );
};
