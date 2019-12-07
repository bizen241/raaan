import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { createContext, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { GroupMemberPermission } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupMemberByOwnerDialog } from "../../dialogs/group-members/DeleteGroupMemberByOwnerDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const GroupMemberPermissionContext = createContext<GroupMemberPermission>("guest");

export const GroupMemberList = createEntityList("GroupMember")(
  React.memo(({ entity: groupMember }) => {
    const permission = useContext(GroupMemberPermissionContext);

    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupMember.userSummaryId, false);

    const isGroupOwner = permission === "owner";

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${groupMember.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
        {isGroupOwner && (
          <TableCell padding="checkbox">
            {groupMember.permission !== "owner" && (
              <Menu>
                <MenuItem icon={<Delete />} label="追放" onClick={onToggleDeleteDialog} />
              </Menu>
            )}
          </TableCell>
        )}
        <DeleteGroupMemberByOwnerDialog
          groupMemberId={groupMember.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
