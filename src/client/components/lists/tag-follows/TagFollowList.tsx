import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const TagFollowList = createEntityList("TagFollow")(
  React.memo(({ entity: userFollow }) => {
    const { entity: tagSummary } = useEntity("TagSummary", userFollow.targetSummaryId);
    if (tagSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/tags/${tagSummary.name}`}>
              <Typography>{tagSummary && tagSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
