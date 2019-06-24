import { Box, IconButton, TableCell } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { UserSession } from "../../../../shared/api/entities";
import { UserContext } from "../../project/Context";

export const UserSessionList = React.memo<EntityListProps<UserSession>>(props => {
  return <EntityList {...props} entityType="UserSession" itemComponent={UserSessionListItem} />;
});

const UserSessionListItem = React.memo<EntityListItemProps<UserSession>>(({ entity: userSession }) => {
  const currentUser = useContext(UserContext);

  return (
    <>
      <TableCell>
        <Box display="flex" flexDirection="column">
          {userSession.userAgent}
        </Box>
      </TableCell>
      {userSession.userId === currentUser.id ? (
        <TableCell padding="checkbox">
          <IconButton>
            <Delete />
          </IconButton>
        </TableCell>
      ) : null}
    </>
  );
});
