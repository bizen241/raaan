import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ContestList = createEntityList("Contest")(
  React.memo(({ entity: contest }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/contests/${contest.id}`}>
              <Typography>{contest.title || "無題"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
