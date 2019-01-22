import * as React from "react";
import { Column } from "../ui";

export const Page: React.FunctionComponent = ({ children }) => (
  <Column padding="small" center="cross">
    <Column style={{ width: "100%", maxWidth: "1000px" }}>{children}</Column>
  </Column>
);
