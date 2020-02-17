import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Email, Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/user-follows/GroupInvitationsDialog";
import { Column, IconButton, Menu, MenuItem } from "../../ui";

export const UserFollowerList = createEntityList("UserFollow")(
  React.memo(({ entity: userFollow, params, onReload }) => {
    const { currentUserId } = useCurrentUser();

    const [isGroupInvitationsDialogOpen, toggleGroupInvitationsDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", userFollow.followerSummaryId, false);
    if (userSummary === undefined) {
      return (
        <Column>
          <IconButton icon={Refresh} onClick={onReload} />
        </Column>
      );
    }

    const isTarget = currentUserId === params.targetId;

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${userSummary.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
        {isTarget && (
          <TableCell padding="checkbox">
            <Menu>
              <MenuItem icon={<Email />} label="グループに招待" onClick={toggleGroupInvitationsDialog} />
            </Menu>
          </TableCell>
        )}
        <GroupInvitationsDialog
          followerId={userSummary.userId}
          isOpen={isGroupInvitationsDialogOpen}
          onClose={toggleGroupInvitationsDialog}
        />
      </TableRow>
    );
  })
);
