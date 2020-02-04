import { Group, RemoveCircle } from "@material-ui/icons";
import React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteGroupMemberDialog } from "../dialogs/group-members/DeleteGroupMemberDialog";
import { Card, Menu, MenuItem, Property } from "../ui";

export const GroupSummaryViewer = withEntity("GroupSummary")(
  React.memo(({ entity: groupSummary }) => {
    const currentUser = useCurrentUser();

    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entities: groupMembers } = useSearch("GroupMember", {
      groupId: groupSummary.groupId,
      userId: currentUser.id
    });
    const groupMember = groupMembers[0];
    const groupMemberPermission = groupMember !== undefined ? groupMember.permission : "guest";

    const isOwner = groupMemberPermission === "owner";

    return (
      <Card
        icon={<Group />}
        title={groupSummary.name}
        action={
          isOwner && (
            <Menu>
              <MenuItem icon={<RemoveCircle />} label="脱退" onClick={onToggleDeleteDialog} />
            </Menu>
          )
        }
      >
        {groupSummary.description && <Property label="説明">{groupSummary.description}</Property>}
        {groupMember && (
          <DeleteGroupMemberDialog
            groupMemberId={groupMember.id}
            isOpen={isDeleteDialogOpen}
            onClose={onToggleDeleteDialog}
          />
        )}
      </Card>
    );
  })
);
