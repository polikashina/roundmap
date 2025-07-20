import React, { useState, useRef } from "react";
import { Flex, Text, Icon, Button } from "@gravity-ui/uikit";

import { PieChart } from "~src/components/PieChart/PieChart";
import styles from "./Dashboard.css";
import PlusIcon from "@gravity-ui/icons/svgs/plus.svg";
import ArrowDownToLineIcon from "@gravity-ui/icons/svgs/arrow-down-to-line.svg";
import { downloadChart } from "~src/utils/downloadChart";
import { useTranslation } from "react-i18next";
import { AreaSettings, AreaSettingsForm } from "../AreaSettings/AreaSettings";
import { COLORS } from "~src/constants/colors";
import i18next from "i18next";
const VIEWBOX_SIZE = 600;

const INIT: AreaSettingsForm = {
  areas: [
    { id: 1, name: "Здоровье", value: 8, color: COLORS[0] },
    { id: 2, name: "Карьера", value: 8, color: COLORS[1] },
    { id: 3, name: "Финансы", value: 8, color: COLORS[2] },
    { id: 4, name: "Отношения", value: 8, color: COLORS[3] },
    { id: 5, name: "Личностный рост", value: 8, color: COLORS[4] },
    { id: 6, name: "Отдых", value: 8, color: COLORS[5] },
    { id: 7, name: "Окружение", value: 8, color: COLORS[6] },
    { id: 8, name: "Духовность", value: 8, color: COLORS[7] },
  ],
};

export const Dashboard: React.FC = () => {
  const [formValues, setFormValues] = useState<AreaSettingsForm>(INIT);
  const [currentAreaIndex, setCurrentAreaIndex] = useState<number>();
  const [isEditMode, setEditMode] = useState(false);

  const chartRef = useRef<SVGSVGElement>(null);

  const { t } = useTranslation("area");

  const onAdd = () => {
    setCurrentAreaIndex(undefined);
  };

  const onDownload = () => {
    downloadChart(chartRef.current);
  };

  const onChange = (values: AreaSettingsForm) => {
    setFormValues(values);
  };

  return (
    <Flex gap={10}>
      <div className={styles["dashboard__form-column"]}>
        <AreaSettings
          initialValues={INIT}
          isEditMode={isEditMode}
          onChange={onChange}
        />
      </div>
      <div className={styles.dashboard__chart}>
        <Button className={styles.dashboard__download} onClick={onDownload}>
          {t("download")} <Icon data={ArrowDownToLineIcon} />
        </Button>
        <PieChart
          ref={chartRef}
          items={formValues.areas}
          viewBoxSize={VIEWBOX_SIZE}
        />
      </div>
    </Flex>
  );
};
