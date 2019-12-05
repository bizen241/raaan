import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Objection } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ObjectionList = createEntityList<Objection>({ entityType: "Objection" })(
  React.memo(({ entity: objection }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/objections/${objection.id}`}>
              <Typography>{objection.state}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
