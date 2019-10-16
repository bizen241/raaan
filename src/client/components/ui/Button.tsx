import { Button as MuiButton, makeStyles, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export const Button = React.memo<{
  color?: ButtonProps["color"];
  icon?: React.ReactNode;
  label: React.ReactNode;
  labelColor?: TypographyProps["color"];
  disabled?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
}>(({ icon, label, labelColor, href, to, ...props }) => {
  const buttonClasses = useButtonStyles();

  const linkProps =
    to !== undefined
      ? {
          to,
          component: Link
        }
      : {
          href
        };

  return (
    <MuiButton className={buttonClasses.button} variant="contained" {...props} {...linkProps}>
      {icon}
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
