import { Email, Person, ViewComfy } from "@material-ui/icons";
import React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../dialogs/user-follows/GroupInvitationsDialog";
import { Card, Menu, MenuItem, Property } from "../ui";

export const UserSummaryViewer = withEntity("UserSummary")(
  React.memo(({ entity: userSummary }) => {
    const { currentUserId } = useCurrentUser();

    const { userId } = userSummary;

    const [isGroupInvitationsDialogOpen, toggleGroupInvitationsDialog] = useToggleState();

    const isOwn = userId === currentUserId;

    return (
      <Card
        icon={<Person />}
        title={isOwn ? "自分の情報" : "ユーザーの情報"}
        action={
          <Menu>
            <MenuItem icon={<ViewComfy />} label="記録" to={`/users/${userId}/diary`} />
            {!isOwn && <MenuItem icon={<Email />} label="グループに招待" onClick={toggleGroupInvitationsDialog} />}
          </Menu>
        }
      >
        <Property label="提出回数">{userSummary.submitCount}</Property>
        <Property label="打鍵回数">{userSummary.typeCount}</Property>
        <GroupInvitationsDialog
          followerId={userSummary.userId}
          isOpen={isGroupInvitationsDialogOpen}
          onClose={toggleGroupInvitationsDialog}
        />
      </Card>
    );
  })
);
