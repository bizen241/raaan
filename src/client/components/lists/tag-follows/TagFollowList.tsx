import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column, IconButton } from "../../ui";

export const TagFollowList = createEntityList("TagFollow")(
  React.memo(({ entity: userFollow, onReload }) => {
    const { entity: tagSummary } = useEntity("TagSummary", userFollow.targetSummaryId, false);
    if (tagSummary === undefined) {
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
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/tags/${tagSummary.name}`}>
              <Typography>{tagSummary && tagSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
