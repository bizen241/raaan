import { Button, Classes, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";

export const ContentItemEditorMenu = React.memo<{
  onDelete: () => void;
  onPreview: () => void;
}>(({ onDelete, onPreview }) => {
  return (
    <Popover
      content={
        <Menu>
          <MenuItem text="プレビュー (p)" onClick={onPreview} />
          <MenuItem text="削除 (Delete)" onClick={onDelete} intent="danger" />
        </Menu>
      }
      position="bottom-right"
    >
      <Button className={`${Classes.iconClass("more")}`} />
    </Popover>
  );
});
