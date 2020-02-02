import { TableCell as MuiTableCell, TableRow as MuiTableRow } from "@material-ui/core";
import React from "react";
import { Column } from "./Column";
import { Row } from "./Row";

export const TableRow = React.memo<{
  action?: React.ReactNode;
  children: React.ReactNode;
}>(({ action, children }) => (
  <MuiTableRow>
    <MuiTableCell padding="none">
      <Row alignItems="center" px={1} py={1} minHeight="64px">
        <Column flex={1}>{children}</Column>
        {action}
      </Row>
    </MuiTableCell>
  </MuiTableRow>
));
