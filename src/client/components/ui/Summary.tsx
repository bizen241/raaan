import { ButtonGroup, Classes } from "@blueprintjs/core";
import * as React from "react";
import { useEffect, useRef } from "react";
import { manageHotKey } from "../utils/hotKey";
import { Row } from "./Flex";

export const Summary: React.FunctionComponent<{
  title?: React.ReactNode;
  focusKey?: string;
  isOpen?: boolean;
  onClick?: () => void;
}> = ({ title, focusKey, isOpen = true, onClick, children }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(
    manageHotKey(
      {
        [focusKey || ""]: () => ref.current && ref.current.focus()
      },
      focusKey !== undefined
    ),
    []
  );

  return (
    <Row>
      <ButtonGroup fill minimal>
        <button className={`${Classes.BUTTON} ${Classes.FILL} ${Classes.ALIGN_LEFT}`} ref={ref} onClick={onClick}>
          <span
            className={`${Classes.ICON_STANDARD} ${Classes.iconClass(isOpen ? "chevron-down" : "chevron-right")}`}
          />
          <span className={Classes.BUTTON_TEXT}>{title || ""}</span>
        </button>
        {children}
      </ButtonGroup>
    </Row>
  );
};
