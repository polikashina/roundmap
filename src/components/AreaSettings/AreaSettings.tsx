import React, { useState } from "react";
import { Button, Flex, Slider, TextInput, Text } from "@gravity-ui/uikit";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { Icon } from "@gravity-ui/uikit";
import styles from "./AreaSettings.css";

import { AreaSettings as AreaSettingsType } from "../types/AreaSettings";
import TrashBinIcon from "@gravity-ui/icons/svgs/trash-bin.svg";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

type AreaSettingsFormValue = AreaSettingsType & {
  id: number;
};

export type AreaSettingsForm = {
  areas: AreaSettingsFormValue[];
};

type AreaSettingsProps = {
  initialValues: AreaSettingsForm;
  isEditMode: boolean;
  onChange: (values: AreaSettingsForm) => void;
};

const validateName = (value: string): string | undefined =>
  value?.trim() ? undefined : i18next.t("common:validation.required");

export const AreaSettings: React.FC<AreaSettingsProps> = ({
  initialValues,
  onChange,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const { t } = useTranslation("area");

  const isInvalidForm = (values: AreaSettingsForm) =>
    values.areas.some(({ name }) => !name.trim());

  return (
    <Form
      initialValues={initialValues ?? {}}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Flex direction="column" gap={3} className={styles["area-settings"]}>
          <Flex direction="column" gap={2}>
            <Flex gap={1} justifyContent="space-between">
              <Text variant="header-1">{t("settings")}</Text>
              <Button
                disabled={isInvalidForm(values)}
                onClick={() => setEditMode(!isEditMode)}
              >
                {isEditMode
                  ? i18next.t("common:save")
                  : i18next.t("common:edit")}
              </Button>
            </Flex>
            <Text variant="body-1" color="secondary">
              {t("settings.description")}
            </Text>
          </Flex>
          <form onSubmit={() => {}}>
            <Flex direction="column" gap={2}>
              <FieldArray name="areas">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <Flex key={`${name}.id`} direction="column" gap={1}>
                      <Field name={`${name}.name`} validate={validateName}>
                        {({ input, meta }) => (
                          <Flex gap={2} alignItems="center">
                            <div
                              className={styles["area-settings__color"]}
                              style={{
                                backgroundColor: fields.value[index].color,
                              }}
                            />
                            {isEditMode ? (
                              <Flex gap={2} grow={1}>
                                <TextInput
                                  value={input.value}
                                  name={input.name}
                                  controlProps={{
                                    maxLength: 25,
                                  }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    input.onChange(value);
                                    const areas = [...values.areas];
                                    areas[index].name = value;
                                    onChange({ ...values, areas });
                                  }}
                                  error={meta.error ? meta.error : false}
                                  errorMessage={meta.error}
                                />
                                <Button
                                  view="outlined"
                                  onClick={() => {
                                    fields.remove(index);
                                    onChange({
                                      ...values,
                                      areas: [
                                        ...values.areas.slice(0, index),
                                        ...values.areas.slice(index + 1),
                                      ],
                                    });
                                  }}
                                >
                                  <Icon data={TrashBinIcon} />
                                </Button>
                              </Flex>
                            ) : (
                              <Flex gap={1}>
                                <Text
                                  variant="subheader-3"
                                  className={styles["area-settings__name"]}
                                >
                                  {input.value}
                                </Text>
                                <Text
                                  variant="subheader-3"
                                  color="secondary"
                                  className={styles["area-settings__name"]}
                                >
                                  - {values.areas[index].value}
                                </Text>
                              </Flex>
                            )}
                          </Flex>
                        )}
                      </Field>
                      <Field name={`${name}.value`}>
                        {({ input }) => (
                          <Slider
                            min={0}
                            max={10}
                            value={input.value}
                            // marks={11}
                            tooltipDisplay={"off"}
                            onUpdate={(value) => {
                              input.onChange(value);
                              const areas = [...values.areas];
                              areas[index].value = value;
                              onChange({ ...values, areas });
                            }}
                          />
                        )}
                      </Field>
                    </Flex>
                  ))
                }
              </FieldArray>
            </Flex>
          </form>
        </Flex>
      )}
    </Form>
  );
};
