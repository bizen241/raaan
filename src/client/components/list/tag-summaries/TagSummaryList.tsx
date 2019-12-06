import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const TagSummaryList = createEntityList("TagSummary")(
  React.memo(({ entity: tagSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/tags/${tagSummary.name}`}>
              <Typography>{tagSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
