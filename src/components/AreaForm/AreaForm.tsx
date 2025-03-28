import React from "react";
import { Form, Field } from "react-final-form";
import { Flex, TextInput, Button } from "@gravity-ui/uikit";
import type { AreaValue } from "../types/AreaValue";
import type { ValidationErrors } from "final-form";

const validate = (values: AreaValue): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.name) {
    errors.name = "Required field";
  }
  if (!values.value) {
    errors.value = "Required field";
  } else if (values.value <= 0 && values.value > 10) {
    errors.value = "Invalid value. Should be > 0 and <= 10";
  }
  return errors;
};

type AreaFormProps = {
  initialValues?: AreaValue;
  className?: string;
  onSubmit: (values: AreaValue) => void;
};

export const AreaForm: React.FC<AreaFormProps> = ({
  initialValues,
  className,
  onSubmit,
}) => {
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
                      label="Name:"
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
                    label="Value:"
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
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        );
      }}
    </Form>
  );
};
