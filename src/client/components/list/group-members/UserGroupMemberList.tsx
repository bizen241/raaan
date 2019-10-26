import { TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { GroupMember } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const UserGroupMemberList = createEntityList<GroupMember>({ entityType: "GroupMember" })(
  React.memo(({ entity: groupMember }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>{groupMember.groupId}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
