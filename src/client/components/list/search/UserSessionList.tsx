import { Box, IconButton, TableCell, Typography } from "@material-ui/core";
import { Computer, Delete, Smartphone } from "@material-ui/icons";
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
      <TableCell padding="checkbox">
        <Box pl={2}>{userSession.deviceType === "desktop" ? <Computer /> : <Smartphone />}</Box>
      </TableCell>
      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography>{userSession.deviceName}</Typography>
          <Typography>{userSession.os}</Typography>
          <Typography>{userSession.browser}</Typography>
        </Box>
      </TableCell>
      <TableCell padding="checkbox">
        {userSession.userId === currentUser.id && !userSession.isCurrent ? (
          <IconButton onClick={useCallback(() => dispatch(actions.api.delete("UserSession", userSession.id)), [])}>
            <Delete />
          </IconButton>
        ) : null}
      </TableCell>
    </>
  );
});
