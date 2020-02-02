import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column, IconButton } from "../../ui";

export const UserGroupMemberList = createEntityList("GroupMember")(
  React.memo(({ entity: groupMember, onReload }) => {
    const { entity: groupSummary } = useEntity("GroupSummary", groupMember.groupSummaryId, false);
    if (groupSummary === undefined) {
      return (
        <Column>
          <IconButton icon={Refresh} onClick={onReload} />
        </Column>
      );
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
