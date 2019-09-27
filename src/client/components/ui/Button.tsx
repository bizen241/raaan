import { Button as MuiButton, makeStyles, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";

export const Button = React.memo<
  {
    icon?: React.ReactNode;
    label: React.ReactNode;
    labelColor?: TypographyProps["color"];
  } & ButtonProps
>(({ icon, label, labelColor, ...props }) => {
  const buttonClasses = useButtonStyles();

  return (
    <MuiButton className={buttonClasses.button} variant="contained" {...props}>
      {icon && icon}
      <Typography className={icon !== undefined ? buttonClasses.label : undefined} color={labelColor}>
        {label}
      </Typography>
    </MuiButton>
  );
});

export const useButtonStyles = makeStyles(() => ({
  button: {
    paddingTop: "12px",
    paddingBottom: "12px"
  },
  label: {
    marginLeft: "8px"
  }
}));
