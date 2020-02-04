import { Box, TableCell, TableRow, Typography } from "@material-ui/core";
import { Computer, Delete, Smartphone } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteUserSessionDialog } from "../../dialogs/user-sessions/DeleteUserSessionDialog";
import { Column, IconButton } from "../../ui";

export const UserSessionList = createEntityList("UserSession", { itemHeight: 77 })(
  React.memo(({ entity: userSession }) => {
    const currentUser = useCurrentUser();

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
            <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
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
