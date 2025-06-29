import React, { useState, useRef } from "react";
import { Flex, Text, Icon, Button } from "@gravity-ui/uikit";
import { AreaForm } from "~src/components/AreaForm/AreaForm";
import type { AreaValue } from "~src/components/types/AreaValue";
import { PieChart } from "~src/components/PieChart/PieChart";
import styles from "./Dashboard.css";
import PlusIcon from "@gravity-ui/icons/svgs/plus.svg";
import ArrowDownToLineIcon from "@gravity-ui/icons/svgs/arrow-down-to-line.svg";
import { downloadChart } from "~src/utils/downloadChart";
import { useTranslation } from "react-i18next";
const VIEWBOX_SIZE = 400;

export const Dashboard: React.FC = () => {
  const [formValues, setFormValues] = useState<AreaValue[]>([]);
  const [currentAreaIndex, setCurrentAreaIndex] = useState<number>();
  const isEditMode = currentAreaIndex !== undefined;

  const chartRef = useRef<SVGSVGElement>(null);

  const { t } = useTranslation("area");

  const onAdd = () => {
    setCurrentAreaIndex(undefined);
  };

  const onDownload = () => {
    downloadChart(chartRef.current);
  };

  const onSubmit = (values: AreaValue) => {
    if (currentAreaIndex !== undefined) {
      const newFormValues = [...formValues];
      newFormValues[currentAreaIndex] = values;
      setFormValues(newFormValues);
    } else {
      setFormValues([...formValues, values]);
    }
  };

  return (
    <Flex gap={10}>
      <div className={styles.dashboard__chart}>
        <PieChart
          ref={chartRef}
          items={formValues}
          viewBoxSize={VIEWBOX_SIZE}
          onClick={setCurrentAreaIndex}
        />
      </div>
      <Flex
        direction="column"
        gap={4}
        className={styles["dashboard__form-column"]}
      >
        <Flex alignItems="center" justifyContent="space-between" gap={3}>
          <Text variant="header-1">{isEditMode ? t("edit") : t("add")}</Text>
          <Flex gap={3}>
            {isEditMode && (
              <Button onClick={onAdd}>
                <Icon data={PlusIcon} />
              </Button>
            )}
            {formValues.length > 0 && (
              <Button onClick={onDownload}>
                <Icon data={ArrowDownToLineIcon} />
              </Button>
            )}
          </Flex>
        </Flex>
        <AreaForm
          initialValues={isEditMode ? formValues[currentAreaIndex] : undefined}
          className={styles.dashboard__form}
          isEditMode={isEditMode}
          onSubmit={onSubmit}
        />
      </Flex>
    </Flex>
  );
};
