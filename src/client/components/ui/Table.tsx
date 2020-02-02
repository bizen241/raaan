import { Table as MuiTable, TableBody as MuiTableBody } from "@material-ui/core";
import React from "react";

export const Table: React.FunctionComponent = ({ children }) => (
  <MuiTable>
    <MuiTableBody>{children}</MuiTableBody>
  </MuiTable>
);
