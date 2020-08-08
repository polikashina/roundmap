import React from "react";
import cn from "classnames";
import { TextField } from "@material-ui/core";

export enum InputType {
  Text = "text",
  Number = "number",
}

type Props = {
  value: string;
  placeholder: string;
  error?: string;
  className?: string;
  type?: InputType;
  onChange: (value: any) => void;
};

const Input: React.FC<Props> = props => {
  const { value, placeholder, error, className, type = InputType.Text, onChange } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      className={cn("input", className)}
      type={type}
      value={value}
      inputProps={{ maxLength: 20 }}
      error={!!error}
      helperText={error}
      color="primary"
      placeholder={placeholder}
      onChange={changeHandler}
    />
  );
};

export { Input };
