import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseObjection } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ExerciseObjectionList = createEntityList<ExerciseObjection>({ entityType: "ExerciseObjection" })(
  React.memo(({ entity: exerciseObjection }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/exercise-objections/${exerciseObjection.id}`}>
              <Typography>{exerciseObjection.state}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
