import { Button, Classes, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";

export const ContentItemEditorMenu = React.memo<{
  onDelete: () => void;
}>(({ onDelete }) => {
  return (
    <Popover
      content={
        <Menu>
          <MenuItem text="削除 (D)" onClick={onDelete} />
        </Menu>
      }
      position="bottom-right"
    >
      <Button className={`${Classes.iconClass("more")}`} />
    </Popover>
  );
});
