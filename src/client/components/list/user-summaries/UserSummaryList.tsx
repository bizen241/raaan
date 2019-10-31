import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const UserSummaryList = createEntityList<UserSummary>({ entityType: "UserSummary" })(
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
