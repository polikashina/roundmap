import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Text, Loader, Select, Flex } from "@gravity-ui/uikit";
import { ErrorBoundary } from "~src/components/ErrorBoundary/ErrorBoundary";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import styles from "./Layout.css";
import Logo from "~assets/logo.svg";

const LANG_OPTIONS = [
  { value: "ru", content: "Русский" },
  { value: "en", content: "English" },
];

export const Layout = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string[]) => {
    i18n.changeLanguage(value[0]);
  };

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
                {t("about")}
              </Link>
            </li>
            <li className={styles.layout__language}>
              <Text variant="body-1" className={styles.layout__language_label}>
                {t("language")}:
              </Text>
              <Select
                className={styles.layout__language_select}
                value={[i18n.language]}
                options={LANG_OPTIONS}
                onUpdate={handleLanguageChange}
                size="s"
              />
            </li>
            <li>
              <Flex gap={2} alignItems="center">
                <div
                  id="buttonContainerId"
                  className={cn(styles.layout__auth_widget)}
                ></div>
              </Flex>
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
