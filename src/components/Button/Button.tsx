import React from "react";
import { Button as MaterialButton } from "@material-ui/core";

type Props = {
  className?: string;
  onClick: () => void;
};

const Button: React.FC<Props> = props => {
  const { className, children, onClick } = props;

  return (
    <MaterialButton className={className} type="button" onClick={onClick} color="primary" variant="contained">
      {children}
    </MaterialButton>
  );
};

export { Button };
