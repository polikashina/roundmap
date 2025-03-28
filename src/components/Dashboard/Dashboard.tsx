import React, { useState } from "react";
import { Flex, Text, Icon, Button } from "@gravity-ui/uikit";
import { AreaForm } from "~src/components/AreaForm/AreaForm";
import type { AreaValue } from "~src/components/types/AreaValue";
import { PieChart } from "~src/components/PieChart/PieChart";
import styles from "./DashBoard.css";
import PlusIcon from "@gravity-ui/icons/svgs/plus.svg";
import ArrowDownToLineIcon from "@gravity-ui/icons/svgs/arrow-down-to-line.svg";

const VIEWBOX_SIZE = 400;

export const Dashboard: React.FC = () => {
  const [formValues, setFormValues] = useState<AreaValue[]>([]);
  const [currentAreaIndex, setCurrentAreaIndex] = useState<number>();
  const isEditMode = currentAreaIndex !== undefined;

  const onAdd = () => {
    setCurrentAreaIndex(undefined);
  };

  const onDownload = () => {};

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
          <Text variant="header-1">
            {isEditMode ? "Edit area" : "Add area"}
          </Text>
          <Flex gap={3}>
            {isEditMode && (
              <Button onClick={onAdd}>
                <Icon data={PlusIcon} />
              </Button>
            )}
            <Button onClick={onDownload}>
              <Icon data={ArrowDownToLineIcon} />
            </Button>
          </Flex>
        </Flex>
        <AreaForm
          initialValues={isEditMode ? formValues[currentAreaIndex] : undefined}
          className={styles.dashboard__form}
          onSubmit={onSubmit}
        />
      </Flex>
    </Flex>
  );
};
