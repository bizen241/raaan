import React from "react";
import { Column } from "../ui/Column";

export const PageContent: React.FunctionComponent = ({ children }) => {
  return (
    <Column width="100%" maxWidth="1000px" p={1}>
      {children}
    </Column>
  );
};
