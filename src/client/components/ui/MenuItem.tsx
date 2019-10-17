import { makeStyles, MenuItem as MuiMenuItem, Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export const MenuItem = React.memo<{
  icon: React.ReactElement;
  label: React.ReactNode;
  labelColor?: TypographyProps["color"];
  disabled?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
}>(({ icon, label, labelColor, href, to, ...props }) => {
  const menuItemClasses = useMenuItemStyles();

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
    <MuiMenuItem {...props} {...linkProps}>
      {icon}
      <Typography className={icon !== undefined ? menuItemClasses.label : undefined} color={labelColor}>
        {label}
      </Typography>
    </MuiMenuItem>
  );
});

const useMenuItemStyles = makeStyles(() => ({
  label: {
    minWidth: "100px",
    marginLeft: "8px"
  }
}));
