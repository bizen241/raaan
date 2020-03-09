import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const TagFollowList = createEntityList("TagFollow")(
  React.memo(({ entity: userFollow }) => {
    const { entity: tagSummary } = useEntity("TagSummary", userFollow.targetSummaryId);

    return (
      <TableRow>
        <Link label={tagSummary.name} to={`/tags/${tagSummary.name}`} />
      </TableRow>
    );
  })
);
