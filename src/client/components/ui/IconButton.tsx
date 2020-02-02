import { IconButton as MuiIconButton } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

export const IconButton = React.memo<{
  icon: SvgIconComponent;
  href?: string;
  to?: string;
  disabled?: boolean;
  edge?: "start" | "end" | false;
  onClick?: () => void;
}>(({ icon: IconComponent, href, to, ...props }) => {
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
    <MuiIconButton {...props} {...linkProps}>
      <IconComponent />
    </MuiIconButton>
  );
});
