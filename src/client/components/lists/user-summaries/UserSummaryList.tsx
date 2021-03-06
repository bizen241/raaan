import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const UserSummaryList = createEntityList("UserSummary")(
  React.memo(({ entity: userSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${userSummary.userId}`}>
              <Typography>{userSummary.name || "名無しさん"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
