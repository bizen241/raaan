import { Email, Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserSummary } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../dialogs/user-follows/GroupInvitationsDialog";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const UserSummaryViewer = withEntity<UserSummary>({ entityType: "UserSummary" })(
  React.memo(({ entity: userSummary }) => {
    const currentUser = useContext(UserContext);

    const [isGroupInvitationsDialogOpen, toggleGroupInvitationsDialog] = useToggleState();

    const isOwn = userSummary.userId === currentUser.id;

    return (
      <Card
        icon={<Person />}
        title={isOwn ? "自分の情報" : "ユーザーの情報"}
        action={
          !isOwn && (
            <Menu>
              <MenuItem icon={<Email />} label="グループに招待" onClick={toggleGroupInvitationsDialog} />
            </Menu>
          )
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
