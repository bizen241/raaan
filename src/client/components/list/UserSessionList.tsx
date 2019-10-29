import { Box, IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { Computer, Delete, Smartphone } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserSession } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteUserSessionDialog } from "../dialogs/user-sessions/DeleteUserSessionDialog";
import { UserContext } from "../project/Context";
import { Column } from "../ui";

export const UserSessionList = createEntityList<UserSession>({ entityType: "UserSession", itemHeight: 77 })(
  React.memo(({ entity: userSession }) => {
    const currentUser = useContext(UserContext);

    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Box pl={2}>{userSession.deviceType === "desktop" ? <Computer /> : <Smartphone />}</Box>
        </TableCell>
        <TableCell>
          <Column>
            <Typography>{userSession.deviceName}</Typography>
            <Typography>{userSession.os}</Typography>
            <Typography>{userSession.browser}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          {userSession.userId === currentUser.id && !userSession.isCurrent ? (
            <IconButton onClick={onToggleDeleteDialog}>
              <Delete />
            </IconButton>
          ) : null}
        </TableCell>
        <DeleteUserSessionDialog
          userSessionId={userSession.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
