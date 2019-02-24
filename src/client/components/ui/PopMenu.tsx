import { Classes, Menu, Popover } from "@blueprintjs/core";
import * as React from "react";
import { HotKeyMap } from "../utils/hotKey";

export const PopMenu: React.FunctionComponent<{
  items: JSX.Element[];
  hotKeys: HotKeyMap;
}> = ({ items }) => {
  return (
    <Popover content={<Menu>{items}</Menu>} position="bottom-right">
      <button className={`${Classes.BUTTON} ${Classes.MINIMAL} ${Classes.iconClass("more")}`} />
    </Popover>
  );
};
