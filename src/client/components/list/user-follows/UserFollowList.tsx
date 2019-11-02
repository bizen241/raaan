import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserFollow, UserSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const UserFollowList = createEntityList<UserFollow>({ entityType: "UserFollow" })(
  React.memo(({ entity: userFollow }) => {
    const { entity: userSummary } = useEntity<UserSummary>("UserSummary", userFollow.userSummaryId);

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${userFollow.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
