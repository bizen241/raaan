import { Email } from "@material-ui/icons";
import * as React from "react";
import { useGroupMemberPermission } from "../../../hooks/useGroupMemberPermission";
import { GroupMemberList } from "../../list/group-members/GroupMemberList";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupGroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const groupMemberPermission = useGroupMemberPermission(groupId);
  const isGroupOwner = groupMemberPermission === "owner";

  return (
    <Page title="メンバーの一覧">
      {isGroupOwner && <Button icon={<Email />} label="グループへの招待" to={`/groups/${groupId}/invite`} />}
      <GroupMemberList initialParams={{ groupId }} isGroupOwner={isGroupOwner} />
    </Page>
  );
});
