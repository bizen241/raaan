import { TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { UserAccount } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";

export const UserAccountList = createEntityList<UserAccount>({ entityType: "UserAccount" })(
  React.memo(({ entity: userAccount }) => {
    return (
      <TableRow>
        <TableCell>
          <Typography>{userAccount.provider}</Typography>
        </TableCell>
      </TableRow>
    );
  })
);
