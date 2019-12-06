import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const UserMessageList = createEntityList("UserMessage")(
  React.memo(({ entity: userMessage }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/user-messages/${userMessage.id}`}>
              <Typography>{userMessage.body}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
