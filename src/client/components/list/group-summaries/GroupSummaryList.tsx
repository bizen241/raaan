import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { GroupSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const GroupSummaryList = createEntityList<GroupSummary>({ entityType: "GroupSummary" })(
  React.memo(({ entity: groupSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/groups/${groupSummary.groupId}`}>
              <Typography>{groupSummary.name || "名無しのグループ"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
