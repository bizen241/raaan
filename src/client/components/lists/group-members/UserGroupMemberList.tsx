import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const UserGroupMemberList = createEntityList("GroupMember")(
  React.memo(({ entity: groupMember }) => {
    const { entity: groupSummary } = useEntity("GroupSummary", groupMember.groupSummaryId);

    return (
      <TableRow>
        <Link label={groupSummary.name || "名無しのグループ"} to={`/groups/${groupSummary.groupId}`} />
      </TableRow>
    );
  })
);
