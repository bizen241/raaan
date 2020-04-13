import { Button as MuiButton, makeStyles, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { Column } from "./Column";

export const Button = React.memo<{
  color?: ButtonProps["color"];
  icon?: React.ReactNode;
  label: React.ReactNode;
  labelColor?: TypographyProps["color"];
  disabled?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
}>(({ icon, label, labelColor, href, to, color = "secondary", ...props }) => {
  const buttonClasses = useButtonStyles();

  const linkProps =
    to !== undefined
      ? {
          to,
          component: Link,
        }
      : {
          href,
        };

  return (
    <Column pb={1}>
      <MuiButton className={buttonClasses.button} variant="contained" color={color} {...props} {...linkProps}>
        {icon}
        <Typography className={icon !== undefined ? buttonClasses.label : undefined} color={labelColor}>
          {label}
        </Typography>
      </MuiButton>
    </Column>
  );
});

export const useButtonStyles = makeStyles(() => ({
  button: {
    paddingTop: "16px",
    paddingBottom: "16px",
    justifyContent: "left",
  },
  label: {
    marginLeft: "16px",
  },
}));
