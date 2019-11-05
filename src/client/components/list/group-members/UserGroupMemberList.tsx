import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { GroupMember, GroupSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const UserGroupMemberList = createEntityList<GroupMember>({ entityType: "GroupMember" })(
  React.memo(({ entity: groupMember }) => {
    const { entity: groupSummary } = useEntity<GroupSummary>("GroupSummary", groupMember.groupSummaryId);
    if (groupSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/groups/${groupSummary.groupId}`}>
              <Typography>{groupSummary.name || "名無しのグループ"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
