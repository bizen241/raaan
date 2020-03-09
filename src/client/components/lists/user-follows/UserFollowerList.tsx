import { Email } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/user-follows/GroupInvitationsDialog";
import { Link, Menu, MenuItem, TableRow } from "../../ui";

export const UserFollowerList = createEntityList("UserFollow")(
  React.memo(({ entity: userFollow, params }) => {
    const { currentUserId } = useCurrentUser();

    const [isGroupInvitationsDialogOpen, toggleGroupInvitationsDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", userFollow.followerSummaryId);

    const isTarget = currentUserId === params.targetId;

    return (
      <TableRow
        action={
          isTarget && (
            <Menu>
              <MenuItem icon={<Email />} label="グループに招待" onClick={toggleGroupInvitationsDialog} />
            </Menu>
          )
        }
      >
        <Link label={userSummary.name} to={`/users/${userSummary.userId}`} />
        <GroupInvitationsDialog
          followerId={userSummary.userId}
          isOpen={isGroupInvitationsDialogOpen}
          onClose={toggleGroupInvitationsDialog}
        />
      </TableRow>
    );
  })
);
