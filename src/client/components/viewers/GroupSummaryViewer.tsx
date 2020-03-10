import { Group, RemoveCircle } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteGroupMemberDialog } from "../dialogs/group-members/DeleteGroupMemberDialog";
import { Card, Menu, MenuItem, Property } from "../ui";

export const GroupSummaryViewer = React.memo<{
  groupSummaryId: EntityId<"GroupSummary">;
}>(({ groupSummaryId }) => {
  const { currentUserId } = useCurrentUser();

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const { entity: groupSummary } = useEntity("GroupSummary", groupSummaryId);
  const { entities: groupMembers } = useSearch("GroupMember", {
    groupId: groupSummary.groupId,
    userId: currentUserId
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
});
