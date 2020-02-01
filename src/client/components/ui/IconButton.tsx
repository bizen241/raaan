import { IconButton as MuiIconButton } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";

export const IconButton: React.FunctionComponent<{
  icon: SvgIconComponent;
  onClick: () => void;
}> = ({ icon: IconComponent, onClick }) => {
  return (
    <MuiIconButton onClick={onClick}>
      <IconComponent />
    </MuiIconButton>
  );
};
