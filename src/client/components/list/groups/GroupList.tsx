import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Group } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const GroupList = createEntityList<Group>({ entityType: "Group" })(
  React.memo(({ entity: group }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/groups/${group.id}`}>
              <Typography>{group.name || "名無しのグループ"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
