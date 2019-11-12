import { Group as GroupIcon, Keyboard, Person, RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Group, GroupMember } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteGroupMemberDialog } from "../dialogs/group-members/DeleteGroupMemberDialog";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Menu, MenuItem, Property } from "../ui";

export const GroupViewer = withEntity<Group, {}>({ entityType: "Group" })(({ entityId: groupId, entity: group }) => {
  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const { entities: groupMembers } = useSearch<GroupMember>("GroupMember", {
    groupId,
    userId: currentUser.id
  });
  const groupMember = groupMembers[0];

  return (
    <Column>
      <Button icon={<Keyboard />} label="クイズ" to={`/groups/${groupId}/group-exercises`} />
      <Button icon={<Person />} label="メンバー" to={`/groups/${groupId}/group-members`} />
      <Card
        icon={<GroupIcon />}
        title={group.name}
        action={
          <Menu>
            {groupMember && groupMember.permission !== "owner" && (
              <MenuItem icon={<RemoveCircle />} label="脱退" onClick={onToggleDeleteDialog} />
            )}
          </Menu>
        }
      >
        <Property label="説明">{group.description}</Property>
      </Card>
      {groupMember && (
        <DeleteGroupMemberDialog
          groupMemberId={groupMember.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      )}
    </Column>
  );
});
