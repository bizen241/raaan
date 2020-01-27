import React from "react";
import { Column } from "../ui/Column";
import { Header } from "./Header";

export const Page: React.FunctionComponent<{
  title?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
      <Header title={title} />
      <Column width="100%" maxWidth="1000px" p={1}>
        {children}
      </Column>
    </Column>
  );
};
