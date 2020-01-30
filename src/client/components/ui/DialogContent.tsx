import React from "react";
import { Column } from "./Column";

export const DialogContent: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Column alignItems="center">
      <Column width="100%" maxWidth="1000px" p={1}>
        {children}
      </Column>
    </Column>
  );
};
