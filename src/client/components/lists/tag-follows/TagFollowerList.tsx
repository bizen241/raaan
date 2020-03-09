import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const TagFollowerList = createEntityList("TagFollow")(
  React.memo(({ entity: userFollow }) => {
    const { entity: userSummary } = useEntity("UserSummary", userFollow.followerSummaryId);

    return (
      <TableRow>
        <Link label={userSummary.name} to={`/users/${userSummary.userId}`} />
      </TableRow>
    );
  })
);
