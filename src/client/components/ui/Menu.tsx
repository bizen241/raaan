import { IconButton, Menu as MuiMenu } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";

export const Menu: React.FunctionComponent = ({ children }) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  return (
    <div>
      <IconButton onClick={useCallback(e => setAnchorElement(e.currentTarget), [])}>
        <MoreVert />
      </IconButton>
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