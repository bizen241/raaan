import { Delete } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { CancelGroupInvitationDialog } from "../../dialogs/group-invitations/DeleteGroupInvitationByOwnerDialog";
import { Link, Menu, MenuItem, TableRow } from "../../ui";

export const GroupGroupInvitationList = createEntityList("GroupInvitation")(
  React.memo(({ entity: groupInvitation }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupInvitation.targetSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Delete />} label="取り消し" onClick={onToggleDeleteDialog} />
          </Menu>
        }
      >
        <Link label={userSummary.name} to={`/users/${userSummary.userId}`} />
        <CancelGroupInvitationDialog
          groupInvitationId={groupInvitation.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
