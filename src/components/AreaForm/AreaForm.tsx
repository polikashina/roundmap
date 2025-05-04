import React from "react";
import { Form, Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Flex, TextInput, Button } from "@gravity-ui/uikit";
import type { AreaValue } from "../types/AreaValue";
import type { ValidationErrors } from "final-form";
import i18next from "i18next";

type AreaFormProps = {
  initialValues?: AreaValue;
  isEditMode: boolean;
  className?: string;
  onSubmit: (values: AreaValue) => void;
};

const validate = (values: AreaValue): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.name) {
    errors.name = i18next.t("common:validation.required");
  }
  if (!values.value) {
    errors.value = i18next.t("common:validation.required");
  } else if (values.value <= 0 || values.value > 10) {
    errors.value = i18next.t("common:validation.invalidValue");
  }
  return errors;
};

export const AreaForm: React.FC<AreaFormProps> = ({
  initialValues,
  isEditMode,
  className,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Form
      initialValues={initialValues ?? {}}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, form }) => {
        return (
          <form
            className={className}
            onSubmit={(values) => {
              handleSubmit(values);
              form.reset();
            }}
          >
            <Flex direction="column" gap={2}>
              <Field name="name">
                {({ input, meta }) => (
                  <>
                    <TextInput
                      value={input.value}
                      name={input.name}
                      label={t("form.name")}
                      controlProps={{
                        maxLength: 20,
                      }}
                      onChange={input.onChange}
                      error={meta.error && meta.touched ? meta.error : false}
                      errorMessage={meta.error}
                    />
                  </>
                )}
              </Field>
              <Field name="value">
                {({ input, meta }) => (
                  <TextInput
                    value={input.value}
                    name={input.name}
                    label={t("form.value")}
                    type="number"
                    controlProps={{
                      min: 1,
                      max: 10,
                      step: 1,
                    }}
                    onChange={input.onChange}
                    error={meta.error && meta.touched ? meta.error : false}
                  />
                )}
              </Field>
              <Button type="submit">{isEditMode ? t("save") : t("add")}</Button>
            </Flex>
          </form>
        );
      }}
    </Form>
  );
};
