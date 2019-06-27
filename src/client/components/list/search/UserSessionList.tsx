import { Box, IconButton, TableCell } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { UserSession } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";

export const UserSessionList = React.memo<EntityListProps<UserSession>>(props => {
  return <EntityList {...props} entityType="UserSession" itemComponent={UserSessionListItem} />;
});

const UserSessionListItem = React.memo<EntityListItemProps<UserSession>>(({ entity: userSession }) => {
  const dispatch = useDispatch();
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
          <IconButton onClick={useCallback(() => dispatch(actions.api.delete("UserSession", userSession.id)), [])}>
            <Delete />
          </IconButton>
        </TableCell>
      ) : null}
    </>
  );
});
