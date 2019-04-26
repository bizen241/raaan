import { Button, Classes, Dialog } from "@blueprintjs/core";
import * as React from "react";
import { ThemeConsumer } from "../../style";
import { Column } from "./Flex";

export const Modal = React.memo<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}>(({ children, isOpen, onClose }) => {
  return (
    <ThemeConsumer>
      {theme => (
        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          style={{
            width: "95vw",
            height: "95vh",
            maxWidth: "1000px",
            margin: 0,
            padding: 0
          }}
          className={theme.name === "light" ? "bp3-light" : "bp3-dark"}
        >
          <Column className={Classes.DIALOG_BODY} padding flex={1}>
            <Column flex={1}>{isOpen ? { children } : null}</Column>
            <Button onClick={onClose}>閉じる (Esc)</Button>
          </Column>
        </Dialog>
      )}
    </ThemeConsumer>
  );
});
