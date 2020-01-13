import { IconButton, Menu as MuiMenu } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useCallback, useState } from "react";

export const Menu: React.FunctionComponent<{
  icon?: React.ReactNode;
}> = ({ icon, children }) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  return (
    <div>
      <IconButton onClick={useCallback(e => setAnchorElement(e.currentTarget), [])}>{icon || <MoreVert />}</IconButton>
      <MuiMenu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={useCallback(() => setAnchorElement(null), [])}
      >
        {children}
      </MuiMenu>
    </div>
  );
};
