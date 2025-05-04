import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return <div>{t("about")}</div>;
};

export default AboutPage;
