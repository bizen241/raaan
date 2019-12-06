import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { CancelGroupInvitationDialog } from "../../dialogs/group-invitations/DeleteGroupInvitationByOwnerDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const GroupGroupInvitationList = createEntityList("GroupInvitation")(
  React.memo(({ entity: groupInvitation }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupInvitation.targetSummaryId);
    if (userSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${userSummary.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Delete />} label="取り消し" onClick={onToggleDeleteDialog} />
          </Menu>
        </TableCell>
        <CancelGroupInvitationDialog
          groupInvitationId={groupInvitation.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
