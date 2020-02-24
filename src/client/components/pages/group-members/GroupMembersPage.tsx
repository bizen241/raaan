import { Email } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { GroupMemberList, GroupMemberPermissionContext } from "../../lists/group-members/GroupMemberList";
import { Button } from "../../ui";

export const GroupMembersPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループのメンバー")),
  React.memo(({ entityId: groupId }) => {
    const { currentUserId } = useCurrentUser();

    const { entities: groupMembers } = useSearch("GroupMember", {
      groupId,
      userId: currentUserId
    });
    const groupMember = groupMembers[0];
    const groupMemberPermission = groupMember !== undefined ? groupMember.permission : "guest";

    const isGroupOwner = groupMemberPermission === "owner";

    return (
      <>
        {isGroupOwner && <Button icon={<Email />} label="グループへの招待" to={`/groups/${groupId}/invite`} />}
        <GroupMemberPermissionContext.Provider value={groupMemberPermission}>
          <GroupMemberList initialParams={{ groupId }} />
        </GroupMemberPermissionContext.Provider>
      </>
    );
  })
);
